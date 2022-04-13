"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideOp = void 0;
const allop_1 = require("./allop");
const ridedb_1 = __importDefault(require("../dataBase/ridedb"));
class RideOp extends allop_1.Allop {
    constructor() {
        super(ridedb_1.default);
    }
}
exports.RideOp = RideOp;
//# sourceMappingURL=rideop.js.map