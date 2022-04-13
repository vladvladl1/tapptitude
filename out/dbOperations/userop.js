"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOp = void 0;
const userdb_1 = __importDefault(require("../dataBase/userdb"));
const allop_1 = require("./allop");
class UserOp extends allop_1.Allop {
    constructor() {
        super(userdb_1.default);
    }
}
exports.UserOp = UserOp;
/*class A<T> {
    findAll():T[]{

        return [];
    }
}

class B extends A<string>{

}

let y:B = new  B();
y.findAll();*/
//# sourceMappingURL=userop.js.map