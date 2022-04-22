import {verificaToken} from "../middlewares/verifyToken";
import {IUser} from "../models/userInterface";
import { RideOp} from "../dbOperations/rideop";
import {UserOp} from "../dbOperations/userop";
import {ScooterOp} from "../dbOperations/scooterop";
import {IRide} from "../models/rideInterface";


const multer =  require("multer");
const upload = multer({ dest:"upload"})

const express = require('express');
const rideRouter = express.Router();

const userService = new UserOp();
const scooterService = new ScooterOp();
const rideSerice = new RideOp();


rideRouter.get("/startRide", verificaToken, async (req, res) => {

});

rideRouter.get("/stopRide", verificaToken, async (req, res) => {
    const scooterId = req.params.scooterId;
    const userPos = req.body;

    try{

     //   res.status(200).send(ride);
    }catch (e){
        console.log(e);
    }
});


rideRouter.get("/startRide/:scooterId", verificaToken, async (req, res) => {
    const scooterId = req.params.scooterId;
    const userPos = req.body;
    const username = req.username;
    try{
        let obj;
        obj.username = username;
        obj.scooterId = scooterId;
        obj.price = 0;
        obj.time=0;
        obj.start = userPos;
        obj.stop = {"stop": {}};
        obj.dateOfStart = new Date();
        const ride = rideSerice.createObject(obj);
        res.status(200).send(ride);
    }catch (e){
        console.log(e);
    }
});


export default rideRouter;