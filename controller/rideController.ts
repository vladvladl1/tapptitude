import {Rides} from "../models/rideClass";
import {IRide} from "../models/rideInterface";
import {RideOp} from "../dbOperations/rideop";
import {stripe} from "../Complementary/stripe"
import {Position} from "../dbOperations/allop";

const rideService = new RideOp();

export const startRide = async (req, res) => {
    const scooterId = req.params.scooterId;
    const userPos = req.body;
    const username = req.username;
    console.log("asta este username " +  req.username);

    try{
        const rider = await rideService.findOngoingRideByUsername(username);
        if(userPos.type!=="Point"){
           return res.status(400).send({error:"type of coordinates must be a valid one"});
        }
        if(rider ===null){
            const price = 0;
            const time=0;
            const start = userPos;
            const stop = userPos;
            const dateOfStart = new Date();
            const obj = new Rides(username, scooterId, price, time, start, stop, dateOfStart);
            console.log("obj user " + obj.username);

            const ride = rideService.createObject(<IRide>obj);
            res.status(200).send(ride);
        }else{
            res.status(400).send({error:"you have already started a ride"});
        }
    }catch (e){
        console.log(e);
    }
}


export const stopRide = async (req, res, next) => {
    const scooterId = req.params.scooterId;
    const userPos = req.body;
    const username = req.username;

    try{
        if(userPos.type!=="Point"){
            return res.status(400).send({error:"type of coordinates must be a valid one"});
        }
        const rider = await rideService.findOngoingRideByUsername(username);
        let dateOfStop = new Date();
        let time = parseInt(((dateOfStop.getTime() - rider.dateOfStart.getTime())/1000).toFixed(0));
        let price = time/1000;
        let goodPrice:number  = parseInt(price.toFixed(2));
        req.price = goodPrice;
        let stop: Position= userPos;
        const ride = await rideService.updateStopRide(username, goodPrice, time, stop);
        res.status(200).send({goodPrice, time, stop});
    }catch (e){
        console.log(e);
        res.sendStatus(220);
    }

}

export const history = async (req, res) => {
    const username = req.username;
    try{
        const rides = await rideService.findAllByUsername(username);
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
    let page = req.query.page;
    try{
        page = page -1;
        page = page*10;
        console.log(page);
        const history = await rideService.findPaginated(page, username);
        const numberOfDocuments = await rideService.findNumberOfDocumentsWithUsername(username);

        if(history===null || numberOfDocuments===null){
            res.status(400).send({error:"nothing to show"});
        }else{
            res.status(200).send({history, numberOfDocuments});
        }
    }catch(err){
        console.log(err);
        res.status(400).send({error:"error finding paginated documents"});
    }
}

function giveMeDistance(lat1: number, lat2:number, long1:number, long2: number){
    const earthRadius:number = 6378.1370;
    const rad = Math.PI/180;
    let dlong:number = (long2-long1)*rad;
    let dlat:number = (lat2 - lat1)*rad;
    let a:number = Math.pow(Math.sin(dlat/2.0), 2) + Math.cos(lat1*rad) + Math.cos(lat2*rad) + Math.pow(Math.sin(dlong/2.0), 2);
    let b:number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return 3956 * b;

}

export const distance = async (req, res) => {
    const username = req.username;
    const inter = req.body.intermediary;
    try{
        const ride = await rideService.findOngoingRideByUsername(username);
        if(inter.coordinates[0]<-90 || inter.coordinates[0]>90){
            return res.status(400).send({error:"invalid coordinates"});
        }
        if(inter.coordinates[0]<-180 || inter.coordinates[0]>180){
            return res.status(400).send({error:"invalid coordinates"});
        }
        if(ride.intermediary.coordinates === [0,0] && ride.start.coordinates !== ride.intermediary.coordinates){
            ride.intermediary.coordinates = ride.start.coordinates;
        }else{
            let dist = giveMeDistance(ride.intermediary.coordinates[0], inter.coordinates[0],ride.intermediary.coordinates[1], inter.coordinates[1]);
            ride.intermediary.coordinates = inter.coordinates;
            const rider = await rideService.updateOngoingRide(username, ride.intermediary.coordinates, dist);
            res.status(200).send(dist);
        }
    }catch(err){
        console.log(err);
        res.status(400).send();
    }
}