"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Allop = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Allop {
    constructor(model) {
        this.model = mongoose_1.default.Model;
        this.model = model;
    }
    createObject(object) {
        return this.model.create(object);
    }
    findByEmail(email) {
        return this.model.findOne({ "email": email }, { _id: 0 });
    }
    findByUsername(username) {
        return this.model.findOne({ "username": username }, { _id: 0 });
    }
    deleteByUsername(username) {
        return this.model.deleteOne({ "username": username });
    }
    async findAll(model, clasa, username) {
        let x = await model.find({});
        return x;
    }
}
exports.Allop = Allop;
//# sourceMappingURL=allop.js.map