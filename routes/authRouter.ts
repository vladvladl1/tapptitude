import {NextFunction, Router, Request, Response} from "express";
import {UserOp} from "../dbOperations/userop"
import {verificaToken} from "../middlewares/verifyToken";
import {IUser} from "../models/userInterface";
import {SessionOp} from "../dbOperations/sessionop";
import {ISession} from "../models/sessionInterface";
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


//register get
authRouter.get("/register", async(req, res) => {
    res.status(200).send("all good at register");
});


//login get
authRouter.get("/login", async(req, res) => {
    res.status(200).send("all good at login");
});


//register post route

authRouter.post("/register", async (req: Request<unknown, unknown, IUser>, res) => {

    const {body} = req;
    try{
    if(!( body.email && body.username && body.password)){
       res.status(400).send({error: "wrong data"});
    }

    const om =  await userService.findByEmail(body.email); // await findByEmail(body.email)
    if(om){
            res.send({error: "user already registered"});
    } else{
       // const user = new User(body.email, body.username, body.parola);

        const enc = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, enc);
        const token = jwt.sign({ username : req.username}, process.env.jwtsecret);
        const createdUser = await userService.createObject(body);
        res.status(200).send({om, token});

        }
    }
    catch(e){
         console.log(e);
    }
});

//login route
authRouter.post("/login", async (req, res) => {
    try {
        const user = await userService.findByEmail(req.body.email);
        const enc = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(req.body.password, enc)
        console.log(pass);
        if (!user) {
            res.status(401);
            res.send({error: "no user with this email"});
        }
        bcrypt.compare(req.body.password, user.password, async (err, resp) => {
            if (err) {
                res.status(400).send({error: "wrong passsword"});
            }
            if (resp) {

                const token = jwt.sign({username: req.username}, process.env.jwtsecret);
                const sess = <ISession>{username: req.username, token: token};
                const session = await sessionService.createObject(sess);
                res.status(200).send({user, token});
            }
        });
    }catch(err){
        console.log(err);
    }
});


authRouter.post("/logout",verificaToken ,async (req, res) => {
    try {
        const sess = await sessionService.findByUsername(req.username);
        const something = await sessionService.deleteByUsername(sess.username);
        res.status(200);
    }catch(err){
        console.log(err);
    }
});



export default authRouter;