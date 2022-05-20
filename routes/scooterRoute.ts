import {verificaToken} from "../middlewares/verifyToken";
import {IUser} from "../models/userInterface";
import { ScooterOp} from "../dbOperations/scooterop";
import {Request} from "express";
import {IScooter} from "../models/scooterInterface";
import adminRouter from "./adminRouter";
import {
    createScooter,
    deleteScooters,
    getAllScooters,
    getByRadius, getRealScooterInfo,
    lockScooter, ping, pingScooter,
    scooterDetail, scooterReallock, scooterRealunlock,
    unlockScooter
} from "../controller/scooterController";
import userRouter from "./userRoute";


const multer =  require("multer");
const upload = multer({ dest:"upload"})

const express = require('express');
const scooterRouter = express.Router();
const scooterService = new ScooterOp();

scooterRouter.get("/", async (req, res) => {

});

scooterRouter.get("/unlockScooter", async (req, res) => {
    res.sendStatus(200);
});

scooterRouter.get("/lockScooter", async (req, res) => {
    res.sendStatus(200);
});

scooterRouter.get("/", async (req, res) => {

});


scooterRouter.post("/createScooter", createScooter);



scooterRouter.get("/realScooterInfo", verificaToken, getRealScooterInfo);

scooterRouter.post("/deleteScooters", deleteScooters);

scooterRouter.post("/getNearby", verificaToken, getByRadius);

scooterRouter.post("/getAllScooters", getAllScooters);

scooterRouter.get("/scooterDetail/:scooterId", verificaToken, scooterDetail);

scooterRouter.post("/ping/:scooterId", verificaToken, ping);


scooterRouter.patch("/unlockScooter/:scooterId",verificaToken, scooterRealunlock);

scooterRouter.patch("/lockScooter/:scooterId",verificaToken, scooterReallock);

scooterRouter.post("/unlockRealScooter", verificaToken, scooterRealunlock);

scooterRouter.post("/lockRealScooter", verificaToken, scooterReallock);

export default scooterRouter;