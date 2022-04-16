"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
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
    try {
        if (fil !== undefined) {
            res.status(200).send(fil);
        }
        else {
            res.status(201).send(fil);
            console;
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = userRouter;
//# sourceMappingURL=userRoute.js.map