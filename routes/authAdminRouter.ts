import {NextFunction, Router, Request, Response} from "express";
import { AdminOp} from "../dbOperations/adminop"
import {verificaToken} from "../middlewares/verifyToken";
require("dotenv").config({path:"../.env"});
import {SessionOp} from "../dbOperations/sessionop";
import {IAdmin} from "../models/adminInterface";
import {ISession} from "../models/sessionInterface";




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

authAdminRouter.post("/createTestAdmin", async (req:Request<unknown, unknown, IAdmin>, res) => {
    const {body} = req;
    console.log(body.username);
    try{
        const token = jwt.sign({ username : body.username}, process.env.jwtsecret);
        const admin = await adminService.createObject(body);
        console.log(body);
        console.log(admin);
        return res.status(200).send({body, token});
    }catch(e){
        console.log(e);
    }
})

//login post
authAdminRouter.post("/login", async (req, res) => {
    try {
        const admin = await adminService.findByEmail(req.body.email);


        if (!admin) {
            res.status(401);
            res.send({error: "no user with this email"});
        }

            if (req.body.password !== admin.password) {
                console.log(req.body.password);
                console.log(admin);
                res.status(400).send({error: "wrong passsword"});
            }
            else {
                const token = jwt.sign({username: admin.username}, process.env.jwtsecret);
                const sess = <ISession>{username: admin.username, token: token};
                const session = await sessionService.createObject(sess);
                console.log(session);
                return res.status(200).send({admin, token});
            }

    }catch(err){
        console.log(err);
    }
});

authAdminRouter.post("/logout", verificaToken, async (req, res) => {
    try {
        console.log("req:" + req.username);
        console.log("req.body:" + req.body.username);

        const sess = await sessionService.findByUsername(req.username);

        console.log("sess:" + sess);
        const something = await sessionService.deleteByUsername(sess.username);
        res.status(200).send(sess);
    }catch(err){
        console.log(err);
    }
});

export default authAdminRouter;
