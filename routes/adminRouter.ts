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

});

export default adminRouter;