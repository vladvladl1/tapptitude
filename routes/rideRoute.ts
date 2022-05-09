import {verificaToken} from "../middlewares/verifyToken";
import { RideOp} from "../dbOperations/rideop";
import {UserOp} from "../dbOperations/userop";
import {ScooterOp} from "../dbOperations/scooterop";
import {IRide} from "../models/rideInterface";
import {Rides} from "../models/rideClass";
import {history, payment, startRide, stopRide} from "../controller/rideController";


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

rideRouter.get("/stopRide", verificaToken, async (req, res) => {
res.sendStatus(200);
});

rideRouter.get("/history", verificaToken, history);




rideRouter.post("/stopRide/:scooterId", verificaToken, stopRide);

rideRouter.post("/pay", verificaToken, payment);

rideRouter.post("/startRide/:scooterId", verificaToken, startRide);


export default rideRouter;