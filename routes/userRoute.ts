import {json, Router} from "express";



const bcrypt = require("bcrypt");
const express = require("express");


 const userRouter = Router();

const jwt  = require("jsonwebtoken");
//register route

userRouter.get("/", async (req, res) => {


});

export default userRouter;
