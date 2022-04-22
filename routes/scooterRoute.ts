import {verificaToken} from "../middlewares/verifyToken";
import {IUser} from "../models/userInterface";
import { ScooterOp} from "../dbOperations/scooterop";
import {Request} from "express";
import {IScooter} from "../models/scooterInterface";
import adminRouter from "./adminRouter";


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


scooterRouter.post("/createScooter", async(req: Request<unknown, unknown, IScooter>, res) => {
    const {body} = req;
    try {
        const scooter = await scooterService.createObject(body);
        res.status(200).send(scooter);
    }catch(e){
        console.log(e);
        res.sendStatus(300);
    }
});




scooterRouter.post("/deleteScooters", async(req , res) => {
    try{
        const deleted = await scooterService.deleteAll();
        res.sendStatus(200);
    }catch (err){
        console.log(err);
        res.sendStatus(300);
    }
});

scooterRouter.post("/getAllScooters", async(req , res) => {
    try{
        const finded = await scooterService.findAll();
        res.status(200).send(finded);
    }catch (err){
        console.log(err);
        res.sendStatus(300);
    }
});


scooterRouter.get("/unlockScooter/:scooterId", async(req , res) => {
    const { pin } = req.query;
    const scooterId = req.params.scooterId;
    console.log("un para: " + pin);
    console.log("scooter id este  " + scooterId);
    try {
        const scooter = await scooterService.findByScooterId(scooterId);
        if(scooter.pin == pin) {
            const update = await scooterService.updateLockedByName(scooterId, "unlocked");
            res.status(200).send(update);
        }else{
            res.status(220).send({error: "wrong pin"});
        }
    }catch(err){
        console.log(err);
        res.sendStatus(401);
    }
});


scooterRouter.get("/lockScooter/:scooterId", async(req , res) => {
    const { pin} = req.query;
    const scooterId = req.params.scooterId;
    console.log("params" + pin);
    try {
        const scooter = await scooterService.findByScooterId(scooterId);
        if(scooter.pin == pin) {
            const update = await scooterService.updateLockedByName(scooterId, "unlocked");
            res.status(200).send(update);
        }else{
            res.status(220).send({error: "wrong pin"});
        }
    }catch(err){
        console.log(err);
        res.sendStatus(401);
    }
});


export default scooterRouter;