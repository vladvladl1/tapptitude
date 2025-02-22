import {Rides} from "../models/rideClass";
import {IRide} from "../models/rideInterface";
import {RideOp} from "../dbOperations/rideop";
import {stripe} from "../Complementary/stripe"
import {Position} from "../dbOperations/allop";
import {ScooterOp} from "../dbOperations/scooterop";
import {TCPConnectionService} from "../Complementary/tcp";

const rideService = new RideOp();
const scooterService = new ScooterOp();



export const startRide = async (req, res) => {
    const scooterId = req.params.scooterId;
    const userPos = req.body;
    const username = req.username;
    const id = req._id;
    console.log("asta este username " +  req.username);
    console.log("asta eeste scooter " +  scooterId);

        try {
            const rider = await rideService.findOngoingRideByUsername(id);
            if (userPos.type !== "Point") {
                return res.status(400).send({error: "type of coordinates must be a valid one"});
            }



            if (rider === null) {

                const price = 0;
                const time = 0;
                const start = userPos;
                const stop = userPos;
                const dateOfStart = new Date();
                let intermediary = [userPos.coordinates];
                const obj = new Rides(id, scooterId, price, time, start, stop, dateOfStart, intermediary);
                console.log("obj user " + obj.username);
                await scooterService.updateLockedByName(scooterId, "unlocked");
                await scooterService.updateBookedById(scooterId, "booked");
                const ride = rideService.createObject(<IRide>obj);
                const scooter = await scooterService.findByScooterId(scooterId);
                if(scooter.isDummy==="false"){
                    const tcp = new TCPConnectionService();

                    const some1 = await tcp.getCoordinatesStart("15");
                }
                res.status(200).send({booking:"booked"});
            } else {
                res.status(400).send({error: "you have already started a ride"});
            }
        } catch (e) {
            console.log(e);
        }

}


export const stopRide = async (req, res, next) => {
    const scooterId = req.params.scooterId;
    const userPos = req.body;
    const username = req.username;
    const id = req._id;

        try {
            if (userPos.type !== "Point") {
                return res.status(400).send({error: "type of coordinates must be a valid one"});
            }
            console.log("ajunge?");
            if(scooterId==="real") {
                const tcp = new TCPConnectionService();
                console.log("ajunge1");
                const some = await tcp.lockUnlockRequest(4352, 1);
                console.log("ajunge2");
                await tcp.theLock(some);
                console.log("1");
               // await tcp.getCoordinatesStop();
                console.log("2");
                console.log(some);
                console.log("3");
            }
             await scooterService.updateLockedByName(scooterId, "locked");
            console.log("a");
            const rider = await rideService.findOngoingRideByUsername(id);
            console.log("b");
            const scooter = await scooterService.updateBookedById(rider.scooterId, "unbooked");
            console.log("c");
            let dateOfStop = new Date();
            let time = parseInt(((dateOfStop.getTime() - rider.dateOfStart.getTime()) / 1000).toFixed(0));
            let distance = rider.distance;
            let price1 = distance / 10;
            let price: number = parseInt(price1.toFixed(2));
            req.price = price;
            let stop: Position = userPos;
            let start = rider.start;
            let intermediary = rider.intermediary;

            const ride = await rideService.updateStopRide(id, price, time, stop);
            res.status(200).send({price, time, start, intermediary, stop, distance});
        } catch (e) {
            console.log(e);
            res.sendStatus(220);
        }
}

export const history = async (req, res) => {
    const username = req.username;
    const id = req._id;
    try{
        const rides = await rideService.findAllByUsername(id);
        res.status(200).send(rides);
    }catch(e){
        console.log(e);
        res.sendStatus(220);
    }
}

export const payment = async (req, res) => {
    const price = req.body.price;
    const paymentMethod = req.body.method;
    try{
        let charge = await stripe.paymentIntents.create(
            {
                amount:price*100,
                currency:"ron",
                payment_method_types: ['card'],
            }
        );
        const clientSecret = charge.client_secret;
        const confirm = stripe.paymentIntents.confirm(charge.id, {payment_method: paymentMethod});

        console.log(clientSecret);

        res.status(200).send(confirm);
    }catch (err){
        console.log(err);
        res.status(400).send({error:"wrong payment"});
    }
}

export const paginatedHistory = async(req, res) => {
    const username = req.username;
    const id = req._id;
    let page = req.query.page;
    try{
        page = page -1;
        page = page*10;
        console.log(page);
        const history = await rideService.findPaginated(page, id);
        if(history===null){
            res.status(400).send({error:"nothing to show"});
        }else{
            res.status(200).send({history});
        }
    }catch(err){
        console.log(err);
        res.status(400).send({error:"error finding paginated documents"});
    }
}

function giveMeDistance(lat1: number, lat2:number, long1:number, long2: number){
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p)/2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((long2 - long1) * p))/2;
    let c1 = 12742 * Math.asin(Math.sqrt(a));
    console.log(c1);
    return c1; // 2 * R; R = 6371 km
}

export const distance = async (req, res) => {
    const username = req.username;
    const coordinates = req.body.coordinates;
    const id = req._id;
    try{
        const ride = await rideService.findOngoingRideByUsername(id);
        const scooter = await scooterService.findByScooterId(ride.scooterId);
        if(coordinates[0]<-90 || coordinates[0]>90){
            return res.status(400).send({error:"invalid coordinates"});
        }
        if(coordinates[0]<-180 || coordinates[0]>180){
            return res.status(400).send({error:"invalid coordinates"});
        }
        let dist=0;

            dist = giveMeDistance(coordinates[0], ride.intermediary[ride.intermediary.length - 1][0], coordinates[1], ride.intermediary[ride.intermediary.length - 1][1]);
            console.log("ride aici ajunge:" + ride.intermediary);
            ride.intermediary.push(coordinates);
            console.log("ride intermediary:" + ride.intermediary);
      //  }
            dist = dist + ride.distance;
            const battery = scooter.battery;
            const actualDate = new Date();
            const time = parseInt(((actualDate.getTime() - ride.dateOfStart.getTime())/1000).toFixed(0));;
            const distance  = dist;
            await rideService.updateOngoingRide(id, ride.intermediary, distance);
            res.status(200).send({battery, time, distance});

    }catch(err){
        console.log(err);
        res.status(400).send();
    }
}

export const ongoingRide = async(req, res) => {
    const username = req.username;
    const id = req._id;
    try{
        const ride = await rideService.findOngoingRideByUsername(id);
        if(ride!==null){
            res.status(200).send({ride});
        }else{
            res.status(400).send({error:"no ongoing ride for this user"});
        }
    }catch (err){
        console.log(err);
        res.status(400).send({error:"error sending good ride"});
    }
}

