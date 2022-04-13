"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt = require("bcrypt");
const express = require("express");
const userRouter = (0, express_1.Router)();
const jwt = require("jsonwebtoken");
//register route
userRouter.get("/", async (req, res) => {
});
exports.default = userRouter;
//# sourceMappingURL=userRoute.js.map