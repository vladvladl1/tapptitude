
import {verificaToken} from "../middlewares/verifyToken";
import {ResourceService} from "../Complementary/s3drivingLicense";
import {UserOp} from "../dbOperations/userop";
import {ScooterOp} from "../dbOperations/scooterop";
import {
    changePassword,
    forgotPassword,
    getdl,
    getMe, modifyBoth,
    modifyEmail,
    modifyUsername,
    savedl
} from "../controller/userController";
const multer =  require("multer");
const upload = multer()


const bcrypt = require("bcrypt");
const express = require("express");

const userService = new UserOp();
const scooterService = new ScooterOp();

 const userRouter = express.Router();

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



userRouter.post("/savedl", verificaToken ,upload.single("fisier"), savedl);

userRouter.post("/getdl", verificaToken, getdl);

userRouter.post("/changePassword",verificaToken, changePassword);

userRouter.post("forgotPassword", forgotPassword);

userRouter.post("/getMe", verificaToken , getMe);

userRouter.patch("/upUsername", verificaToken, modifyUsername);

userRouter.patch("/upEmail", verificaToken, modifyEmail);

userRouter.patch("/upBoth", verificaToken, modifyBoth);





export default userRouter;
