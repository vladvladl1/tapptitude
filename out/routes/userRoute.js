"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const s3drivingLicense_1 = require("../Complementary/s3drivingLicense");
const multer = require("multer");
const upload = multer({ dest: "upload" });
const bcrypt = require("bcrypt");
const express = require("express");
const userRouter = (0, express_1.Router)();
const jwt = require("jsonwebtoken");
//register route
userRouter.get("/", async (req, res) => {
    res.sendStatus(200);
});
userRouter.post("/savePicture", async (req, res) => {
    const body = req.body;
    const fil = req.file;
    const s3 = new s3drivingLicense_1.ResourceService();
    console.log(fil);
    console.log("iar asta e body:");
    console.log(body);
    try {
        if (fil !== undefined) {
            res.status(200).send(fil);
        }
        else {
            const puts3 = await s3.uploadFile(fil, body.username);
            res.status(201).send(puts3);
            console.log(puts3);
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = userRouter;
//# sourceMappingURL=userRoute.js.map