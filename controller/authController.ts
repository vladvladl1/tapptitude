import {SessionOp} from "../dbOperations/sessionop";
import {ISession} from "../models/sessionInterface";
import {UserOp} from "../dbOperations/userop";
import {Request} from "express";
import {IUser} from "../models/userInterface";


const sessionService = new SessionOp();
const userService = new UserOp();

const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");

export const logout = async (req, res) => {

    try {
        const sess = await sessionService.findByUsername(req.username);
        const something = await sessionService.deleteByUsername(sess.username);
        res.sendStatus(200);
    }catch(err){
        console.log(err);
    }
}

export const login = async (req, res) => {
    try {
        const user = await userService.findByEmail(req.body.email);
        if(user.status === "suspended"){
            return res.status(220).send({error:"user suspended"});
        }
        const enc = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(req.body.password, enc)
        console.log(pass);

        const session = await sessionService.findByUsername(user.username);
        if (session) {
            await sessionService.deleteByUsername(user.username);
        }

        if (user===undefined) {
            res.status(220).send({error: "no user with this email"});
        }
        bcrypt.compare(req.body.password, user.password, async (err, resp) => {
            console.log(user.password);
            console.log(user.username);
            console.log(user.email);
            if (err) {
                res.status(220).send({error: "wrong passsword"});
            }
            if (resp) {

                const token = jwt.sign({username: user.username, _id:user._id}, process.env.jwtsecret);
                const sess = <ISession>{username: user.username, token: token};
                const session = await sessionService.createObject(sess);
                console.log("session username:" + session.username);
                return res.status(200).send({user, token});
            }
            res.status(220).send({error: "wrong passsword"});
        });
    }catch(err){

        res.status(220).send({error:"no user in database"});
        console.log(err);
    }
}

export const register = async (req: Request<unknown, unknown, IUser>, res) => {

    const {body} = req;
    body.date = new Date();
    console.log(body);
    console.log(body.email);
    try{
        if( body.email===undefined || body.username===undefined || body.password===undefined ){
            res.status(220).send({error: "wrong data"});
        }
        const thepass = body.password;
        const om =  await userService.findByEmail(body.email); // await findByEmail(body.email)
        if(om){
            return res.status(220).send({error: "user already registered"});
        }
        const man = await userService.findByUsername(body.username);
        if(man){
            res.status(220).send({error: "username taken"});
        }
        else{
            const enc = await bcrypt.genSalt(10);
            const pass = await bcrypt.hash(thepass, enc);
            body.password = pass;
            const user = await userService.createObject(body);
            const created = await userService.findByEmail(body.email);
            const token = jwt.sign({ username : body.username, _id:created._id}, process.env.jwtsecret);
            const sess = <ISession>{username: user.username, token: token};
            const session = await sessionService.createObject(sess);
            return res.status(200).send({user, token});

        }
    }
    catch(e){
        console.log(e);
    }
}