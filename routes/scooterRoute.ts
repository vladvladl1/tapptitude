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


scooterRouter.get("/unlockScooter", async(req , res) => {
    const { pin } = req.query;
    console.log("un para: " + pin);
    try {
        const update = await scooterService.updateLockedByPin(pin, "unlocked");
        res.status(200).send(update);
    }catch(err){
        console.log(err);
        res.sendStatus(401);
    }
});

scooterRouter.get("/lockScooter", async(req , res) => {
    const {pin} = req.query;
    console.log("params" + pin);
    try {
        const scooter = await scooterService.findByPin(pin);
        const update = await scooterService.updateLockedByName(scooter.scooterName, "locked");
        res.status(200).send(update);
    }catch(err){
        console.log(err);
        res.sendStatus(401);
    }
});


export default scooterRouter;