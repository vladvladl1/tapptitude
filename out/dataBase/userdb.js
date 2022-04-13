"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const userSchema = new mongoose_2.Schema({
    email: { type: String },
    username: { type: String },
    password: { type: String },
    drivingLicense: { type: String }
});
const userModel = mongoose_1.default.model("user", userSchema);
exports.default = userModel;
//# sourceMappingURL=userdb.js.map