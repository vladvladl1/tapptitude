"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./userRoute"));
const authRouter_1 = __importDefault(require("./authRouter"));
const firstRoute_1 = __importDefault(require("./firstRoute"));
const appRoute = (0, express_1.default)();
appRoute.use(express_1.default.json());
appRoute.use("/", firstRoute_1.default);
appRoute.use("/auth", authRouter_1.default);
appRoute.use("/user", userRoute_1.default);
exports.default = appRoute;
//# sourceMappingURL=route.js.map