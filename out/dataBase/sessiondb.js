"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const sessionSchema = new mongoose_2.Schema({
    username: { type: String },
    token: { type: JSON }
});
const sessionModel = mongoose_1.default.model("session", sessionSchema);
exports.default = sessionModel;
//# sourceMappingURL=sessiondb.js.map