"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionOp = void 0;
const sessiondb_1 = __importDefault(require("../dataBase/sessiondb"));
const allop_1 = require("./allop");
class SessionOp extends allop_1.Allop {
    constructor() {
        super(sessiondb_1.default);
    }
}
exports.SessionOp = SessionOp;
//# sourceMappingURL=sessionop.js.map