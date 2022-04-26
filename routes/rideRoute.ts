import {verificaToken} from "../middlewares/verifyToken";
import { RideOp} from "../dbOperations/rideop";
import {UserOp} from "../dbOperations/userop";
import {ScooterOp} from "../dbOperations/scooterop";
import {IRide} from "../models/rideInterface";
import {Rides} from "../models/rideClass";


const multer =  require("multer");
const upload = multer({ dest:"upload"})

const express = require('express');
const rideRouter = express.Router();

const userService = new UserOp();
const scooterService = new ScooterOp();
const rideSerice = new RideOp();


rideRouter.get("/startRide", verificaToken, async (req, res) => {
res.sendStatus(200);
});

rideRouter.get("/startRide", verificaToken, async (req, res) => {
res.sendStatus(200);
});

rideRouter.get("/history", verificaToken, async (req, res) => {
   const username = req.username;
   try{
       const rides = await rideSerice.findAllByUsername(username);
       res.status(200).send(rides);
   }catch(e){
       console.log(e);
       res.sendStatus(400);
   }
});


rideRouter.get("/stopRide/:scooterId", verificaToken, async (req, res) => {
    const scooterId = req.params.scooterId;
    const userPos = req.body;
    const username = req.username;

    try{
        const rider = await rideSerice.findOngoingRideByUsername(username);
        let dateOfStop = new Date();
        let time = dateOfStop.getTime() - rider.dateOfStart.getTime();
        let price = time/1000;
        let stop = userPos;
        const ride = await rideSerice.updateStopRide(username, price, time, stop);
        res.status(200).send(ride);
    }catch (e){
        console.log(e);
        res.sendStatus(400);
    }
});


rideRouter.get("/startRide/:scooterId", verificaToken, async (req, res) => {
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
});


export default rideRouter;