import {SessionOp} from "../dbOperations/sessionop";
import {ISession} from "../models/sessionInterface";
import {AdminOp} from "../dbOperations/adminop";
import {Request} from "express";
import {IAdmin} from "../models/adminInterface";

const sessionService = new SessionOp();
const adminService = new AdminOp();
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");


export const logout = async (req, res) => {
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
}

export const login = async (req, res) => {
    try {
        const admin = await adminService.findByEmail(req.body.email);


        if (!admin) {
            res.status(220);
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
}

export const createAdmin = async (req:Request<unknown, unknown, IAdmin>, res) => {
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
}