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

scooterRouter.get("/", verificaToken, async (req, res) => {

});

scooterRouter.post("/unlockScooter", verificaToken, async (req, res) => {
    const scooter = await scooterService.findByUsername(req.scooterName);

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



export default scooterRouter;