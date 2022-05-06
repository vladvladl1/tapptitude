import {NextFunction, Router, Request, Response} from "express";
import { AdminOp} from "../dbOperations/adminop"
import {verificaToken} from "../middlewares/verifyToken";
require("dotenv").config({path:"../.env"});
import {SessionOp} from "../dbOperations/sessionop";
import {IAdmin} from "../models/adminInterface";
import {ISession} from "../models/sessionInterface";
import {createAdmin, login, logout} from "../controller/authAdminController";




const express = require('express');
const authAdminRouter = express.Router();
const adminService = new AdminOp();
const jwt  = require("jsonwebtoken");
const sessionService = new SessionOp();


authAdminRouter.get("/",  async (req, res) => {
    res.status(200).send("good");
})

//logout get
authAdminRouter.get("/logout", async (req, res) => {
    res.status(200).send("good");
});

//login get
authAdminRouter.get("/login", async(req, res) => {
    res.status(200).send("all good at login");
});

authAdminRouter.post("/createTestAdmin", createAdmin)

//login post
authAdminRouter.post("/login", login);

authAdminRouter.post("/logout", verificaToken, logout);

export default authAdminRouter;
