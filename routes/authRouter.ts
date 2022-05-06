import {NextFunction, Router, Request, Response} from "express";
import {UserOp} from "../dbOperations/userop"
import {verificaToken} from "../middlewares/verifyToken";
import {IUser} from "../models/userInterface";
import {SessionOp} from "../dbOperations/sessionop";
import {ISession} from "../models/sessionInterface";
import {login, logout, register} from "../controller/authController";
require("dotenv").config({path:"../.env"});

const bcrypt = require("bcrypt");

const express = require('express');
const authRouter = express.Router();
const userService = new UserOp();
const jwt  = require("jsonwebtoken");
const sessionService = new SessionOp();

//simple get
authRouter.get("/", async(req, res) => {
   res.status(200).send("good here");
});

//logut get
authRouter.get("/logout", async(req, res) => {
    res.status(200).send("good here");
});

//register get
authRouter.get("/register", async(req, res) => {
    res.status(200).send("all good at register");
});


//login get
authRouter.get("/login", async(req, res) => {
    res.status(200).send("all good at login");
});


//register post route

authRouter.post("/register", register);

//login route
authRouter.post("/login", login);


authRouter.post("/logout",verificaToken ,logout);



export default authRouter;
