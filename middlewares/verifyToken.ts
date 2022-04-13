import express, { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import {IUser} from "../models/userInterface";
import {UserOp} from "../dbOperations/userop";
require("dotenv").config({path:"../.env"});

const userService = new UserOp();

export const verificaToken = async (req: Request, res: Response, next: NextFunction) => {

    if (req.headers === undefined || req.headers.authorization === undefined) {
        console.log("0");
        return res.sendStatus(401);
    }
    const token = req.headers.authorization.split(" ")[1];
    let legit;
    try {
        legit = jwt.verify(token, process.env.jwtsecret);
    } catch (e) {
        console.log("1");
        return res.sendStatus(401);
    }
    if (legit == false) {
        console.log("2");
        return res.sendStatus(401);
    }

    const decoded = jwt.decode(token);
    if (decoded === undefined || decoded.username === undefined) {
        console.log("3");
        return res.sendStatus(401);
    }
   // const user: IUser = await userService.findByUsername(decoded.username);
    req.status(200).send(decoded.username);
    return next();
}

