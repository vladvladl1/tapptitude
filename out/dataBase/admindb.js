"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const adminSchema = new mongoose_2.Schema({
    email: { type: String },
    username: { type: String },
    parola: { type: String },
});
const adminModel = mongoose_1.default.model("admin", adminSchema);
exports.default = adminModel;
//# sourceMappingURL=admindb.js.map