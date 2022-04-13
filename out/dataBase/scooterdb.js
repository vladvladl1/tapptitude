"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const scooterSchema = new mongoose_2.Schema({
    batter: { type: Number },
    lockedStatus: { type: String },
    bookedStatus: { type: String },
    lastSeenDate: { type: Date },
    gpsCoordinates: { type: String }
});
const scooterModel = mongoose_1.default.model("scooter", scooterSchema);
exports.default = scooterModel;
//# sourceMappingURL=scooterdb.js.map