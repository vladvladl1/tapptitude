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
        const price = 0;
        const time=0;
        const start = userPos;
        const stop = userPos;
        const dateOfStart = new Date();
        const obj = new Rides(username, scooterId, price, time, start, stop, dateOfStart);
        console.log("obj user " + obj.username);

        const ride = rideSerice.createObject(<IRide>obj);
        res.status(200).send(ride);
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
        let time = dateOfStop.getTime() - rider.dateOfStart.getTime();
        let price = time/1000;
        req.price = price;
        let stop = userPos;
        const ride = await rideSerice.updateStopRide(username, price, time, stop);
        res.status(200).send(ride);
    }catch (e){
        console.log(e);
        res.sendStatus(220);
    }
    return next();
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
    const username = req.username;
    const price = req.price;
    try{
        let charge = await stripe.chrages.create(
            {
                amount:price,
                currency:"ron",
            }
        )
    }catch (err){
        console.log(err);
        res.status(400).send({error:"payment wrong"});
    }
}