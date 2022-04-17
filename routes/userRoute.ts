import {json, Request, Router} from "express";
import {verificaToken} from "../middlewares/verifyToken";
import {ResourceService} from "../Complementary/s3drivingLicense";
import {IUser} from "../models/userInterface";
import {UserOp} from "../dbOperations/userop";
const multer =  require("multer");
const upload = multer({ dest:"upload"})


const bcrypt = require("bcrypt");
const express = require("express");

const userService = new UserOp();

 const userRouter = Router();

const jwt  = require("jsonwebtoken");
//register route

userRouter.get("/", async (req, res) => {
 res.sendStatus(200);
});

//get savedl

userRouter.get("/savedl", async (req, res) => {
    res.sendStatus(200);
});

//get getdl

userRouter.get("/getdl", async (req, res) => {
    res.sendStatus(200);
});

//get getme
userRouter.get("/getMe", async (req, res) => {
    res.sendStatus(200);
});

userRouter.post("/savedl",  async (req: Request & { file:any }, res) => {
   const body = req.body;
   const fil = req.file;
   const s3 = new ResourceService();
    console.log(fil);
    console.log("iar asta e body:");
    console.log(body);
   try{
       if(fil !== undefined) {
           res.status(220).send(fil);
       }else{
           const puts3 = await s3.uploadFile(fil, body.username);
           res.status(200).send(puts3);
           console.log(puts3);
       }
   }catch(err){
    console.log(err);
   }
});

userRouter.post("/getdl", async (req, res) => {
    const filename = req.filename;
    const username = req.username;
    const path = `/Driving_license/${username}/${filename}.jpg`;
    const s3 = new ResourceService();
    const url =  s3.getFileUrl(path);
    if(url!==undefined){
        res.status(200).send(url);
    }else{
        res.sendStatus(300);
    }
});

userRouter.post("/getMe", verificaToken , async(req, res ) => {
    const username = req.username;
    try{
        const person= await userService.findByUsername(username);
        if(person!==undefined){
            res.status(200).send(person);
        }else{
            res.sendStatus(220);
        }
    }catch(err){
        console.log(err);
        res.sendStatus(300);
    }
});

export default userRouter;
