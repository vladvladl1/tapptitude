import {Rides} from "../models/rideClass";
import {IRide} from "../models/rideInterface";
import {RideOp} from "../dbOperations/rideop";
import {stripe} from "../Complementary/stripe"

const rideSerice = new RideOp();

export const startRide = async (req, res) => {
    const scooterId = req.params.scooterId;
    const userPos = req.body;
    const username = req.username;
    console.log("asta este username " +  req.username);

    try{
        const rider = await rideSerice.findByUsername(username);
        if(rider.time === 0 || rider ===null){
            const price = 0;
            const time=0;
            const start = userPos;
            const stop = userPos;
            const dateOfStart = new Date();
            const obj = new Rides(username, scooterId, price, time, start, stop, dateOfStart);
            console.log("obj user " + obj.username);

            const ride = rideSerice.createObject(<IRide>obj);
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
        const rider = await rideSerice.findOngoingRideByUsername(username);
        let dateOfStop = new Date();
        let time = parseInt(((dateOfStop.getTime() - rider.dateOfStart.getTime())/1000).toFixed(0));
        let price = time/1000;
        let goodPrice:number  = parseInt(price.toFixed(2));
        req.price = goodPrice;
        let stop = userPos;
        const ride = await rideSerice.updateStopRide(username, goodPrice, time, stop);
        res.status(200).send({ride});
    }catch (e){
        console.log(e);
        res.sendStatus(220);
    }

}

export const history = async (req, res) => {
    const username = req.username;
    try{
        const rides = await rideSerice.findAllByUsername(username);
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