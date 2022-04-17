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

userRouter.post("/savePicture",  async (req: Request & { file:any }, res) => {
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

userRouter.post("/getPicture", async (req, res) => {



});

userRouter.post("/getMe", verificaToken , async(req, res ) => {
    const username = req.username;
    try{
        const person= await userService.deleteByUsername(username);
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
