import {NextFunction, Router, Request, Response} from "express";
import { AdminOp} from "../dbOperations/adminop"
import {verificaToken} from "../middlewares/verifyToken";
require("dotenv").config({path:"../.env"});
import {SessionOp} from "../dbOperations/sessionop";
import {IAdmin} from "../models/adminInterface";
import {ISession} from "../models/sessionInterface";
import {IScooter} from "../models/scooterInterface";
import {ScooterOp} from "../dbOperations/scooterop";
import {UserOp} from "../dbOperations/userop";
import {RideOp} from "../dbOperations/rideop";

const rideService = new RideOp();
const userService = new UserOp();
const express = require('express');
const adminRouter = express.Router();
const adminService = new AdminOp();
const scooterService = new ScooterOp();

adminRouter.get("/", async (req, res) => {
   res.sendStatus(200);
});

adminRouter.get("/createScooter", async (req, res) => {
    res.sendStatus(200);
});

adminRouter.post("/createScooter", async(req: Request<unknown, unknown, IScooter>, res) => {
    const {body} = req;
    try {
        const scooter = await scooterService.createObject(body);
        res.status(200).send(scooter);
    }catch(e){
        console.log(e);
        res.sendStatus(300);
    }
});

adminRouter.delete("/suspendUser", async(req, res) => {
   const username = req.body.username;
   try{
       const user = userService.deleteByUsername(username);
       res.sendStatus(200);
   }catch(err){
       res.sendStatus(400);
       console.log(err);
   }
});

adminRouter.get("/getByDate", async(req, res) => {
    try{
        const users = await userService.findBySortedDate();
        res.status(200).send(users);
    }catch(err){
        console.log(err);
        res.sendStatus(400);
    }
});

adminRouter.get("scooterInfo/:scooterId", async (req, res) => {
   const scooterId = req.params.scooterId;
    try{
       const scooter = await scooterService.findByScooterId(scooterId);
       if(scooter!==undefined){
           res.status(200).send(scooter);
       }
   }catch(err){
        res.status(400).send({error: "no scooter was find with that ID"});
       console.log(err);
   }
});

adminRouter.get("rideInfo/:rideId", async (req, res) => {
    const id = req.params.rideId;
    try{
        const ride = await rideService.findById(id);
        res.status(200).send(ride);
    }catch(err){
        res.status(400).send({error: "wrong data"});
        console.log(err);
    }
});

export default adminRouter;