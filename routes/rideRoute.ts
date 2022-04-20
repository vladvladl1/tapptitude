import {verificaToken} from "../middlewares/verifyToken";
import {IUser} from "../models/userInterface";
import { RideOp} from "../dbOperations/rideop";


const multer =  require("multer");
const upload = multer({ dest:"upload"})

const express = require('express');
const rideRouter = express.Router();

rideRouter.get("/startRide", verificaToken, async (req, res) => {

});

rideRouter.get("/stopRide", verificaToken, async (req, res) => {

});

export default rideRouter;