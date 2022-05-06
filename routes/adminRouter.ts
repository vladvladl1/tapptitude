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
import {createScooter, getByDate, rideInfo, scooterInfo, suspend} from "../controller/adminController";

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

adminRouter.post("/createScooter", createScooter);

adminRouter.delete("/suspendUser", suspend);

adminRouter.get("/getByDate", getByDate);

adminRouter.get("scooterInfo/:scooterId", scooterInfo);

adminRouter.get("rideInfo/:rideId", rideInfo);

export default adminRouter;