import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import {IUser} from "../models/userInterface";
import {UserOp} from "../dbOperations/userop";
require("dotenv").config({path:"../.env"});

const userService = new UserOp();

export const verificaToken = async (req: Request & {username:string}, res: Response, next: NextFunction) => {

    if (req.headers === undefined || req.headers.authorization === undefined) {
        console.log("0");
        return res.sendStatus(401);
    }
    console.log("header" +req.headers);
    console.log("auth:" + req.headers.authorization);

    const token = req.headers.authorization.split(" ")[1];
    console.log("token:" + token);
    let legit;
    try {
        legit = jwt.verify(JSON.parse(token), process.env.jwtsecret);
        console.log("legit:" + legit);
    } catch (e) {
        console.log("1");
        console.log(e);
          return res.sendStatus(401);
    }
    if (legit == false) {
        console.log("2");
        return res.sendStatus(401);
    }

    const decoded = jwt.decode(JSON.parse(token));
    console.log(decoded);
    if (decoded === undefined || decoded.username === undefined) {
        console.log("3");
        return res.sendStatus(401);
    }
    req.username = decoded.username;
    //res.status(200).send(decoded.username);
    return next();
}

