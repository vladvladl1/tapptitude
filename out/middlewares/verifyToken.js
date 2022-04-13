"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
const jwt = require("jsonwebtoken");
const userop_1 = require("../dbOperations/userop");
const userService = new userop_1.UserOp();
const verificaToken = async (req, res, next) => {
    if (req.headers === undefined || req.headers.authorization === undefined) {
        console.log("0");
        return res.sendStatus(401);
    }
    const token = req.headers.authorization.split(" ")[1];
    let legit;
    try {
        legit = jwt.verify(token, "aleluia");
    }
    catch (e) {
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
};
exports.verificaToken = verificaToken;
//# sourceMappingURL=verifyToken.js.map