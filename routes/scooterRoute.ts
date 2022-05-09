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
    getByRadius,
    lockScooter, pingScooter,
    scooterDetail,
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

scooterRouter.post("/deleteScooters", deleteScooters);

scooterRouter.get("/getNearby", verificaToken, getByRadius);

scooterRouter.post("/getAllScooters", getAllScooters);

scooterRouter.get("/unlockScooter/:scooterId", unlockScooter);

scooterRouter.get("/lockScooter/:scooterId", lockScooter);

scooterRouter.get("/scooterDetail/:scooterId", verificaToken, scooterDetail);

scooterRouter.post("/ping/:scooterId", verificaToken, pingScooter);

export default scooterRouter;