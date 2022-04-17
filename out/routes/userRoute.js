"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../middlewares/verifyToken");
const s3drivingLicense_1 = require("../Complementary/s3drivingLicense");
const userop_1 = require("../dbOperations/userop");
const multer = require("multer");
const upload = multer({ dest: "upload" });
const bcrypt = require("bcrypt");
const express = require("express");
const userService = new userop_1.UserOp();
const userRouter = (0, express_1.Router)();
const jwt = require("jsonwebtoken");
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
userRouter.post("/savedl", async (req, res) => {
    const body = req.body;
    const fil = req.file;
    const s3 = new s3drivingLicense_1.ResourceService();
    console.log(fil);
    console.log("iar asta e body:");
    console.log(body);
    try {
        if (fil !== undefined) {
            res.status(220).send(fil);
        }
        else {
            const puts3 = await s3.uploadFile(fil, body.username);
            res.status(200).send(puts3);
            console.log(puts3);
        }
    }
    catch (err) {
        console.log(err);
    }
});
userRouter.post("/getdl", async (req, res) => {
    const filename = req.filename;
    const username = req.username;
    const path = `/Driving_license/${username}/${filename}.jpg`;
    const s3 = new s3drivingLicense_1.ResourceService();
    const url = s3.getFileUrl(path);
    if (url !== undefined) {
        res.status(200).send(url);
    }
    else {
        res.sendStatus(300);
    }
});
userRouter.post("/getMe", verifyToken_1.verificaToken, async (req, res) => {
    const username = req.username;
    try {
        const person = await userService.findByUsername(username);
        if (person !== undefined) {
            res.status(200).send(person);
        }
        else {
            res.sendStatus(220);
        }
    }
    catch (err) {
        console.log(err);
        res.sendStatus(300);
    }
});
exports.default = userRouter;
//# sourceMappingURL=userRoute.js.map