"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const route_1 = __importDefault(require("./routes/route"));
require("dotenv").config({ path: "./.env" });
class Server {
    constructor(port) {
        this.appRoutes = route_1.default;
        this.srv = (0, express_1.default)();
        this.port = port;
        this.srv.use("/", this.appRoutes);
    }
    listen() {
        this.srv.listen(this.port, () => {
            console.log("LISTENING TO PORT:" + this.port);
        });
    }
    connectToDataBase() {
        mongoose_1.default.connect(process.env.db);
        console.log("CONEXION TO DATABASE ESTABLISHED");
    }
}
exports.Server = Server;
//# sourceMappingURL=server-config.js.map