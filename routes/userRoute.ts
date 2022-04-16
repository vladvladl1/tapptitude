import {json, Request, Router} from "express";
import {verificaToken} from "../middlewares/verifyToken";
const multer =  require("multer");
const upload = multer({ dest:"upload"})


const bcrypt = require("bcrypt");
const express = require("express");


 const userRouter = Router();

const jwt  = require("jsonwebtoken");
//register route

userRouter.get("/", async (req, res) => {
 res.sendStatus(200);
});

userRouter.post("/savePicture",  async (req: Request & { file:any }, res) => {
   const body = req.body;
   const fil = req.file;
   try{
       if(fil !== undefined) {
           res.status(200).send(fil);
       }else{
           res.status(201).send(fil);
           console
       }
   }catch(err){
    console.log(err);
   }

});


export default userRouter;
