"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const cursaSchema = new mongoose_2.Schema({
    username: { type: String },
    pret: { type: Number },
    durata: { type: Number },
    pornire: { type: String },
    oprire: { type: String }
});
const rideModel = mongoose_1.default.model('ride', cursaSchema);
exports.default = rideModel;
//# sourceMappingURL=ridedb.js.map