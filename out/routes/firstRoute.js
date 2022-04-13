"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firstRouter = (0, express_1.Router)();
firstRouter.get("/", async (req, res) => {
    res.send("all good");
});
exports.default = firstRouter;
//# sourceMappingURL=firstRoute.js.map