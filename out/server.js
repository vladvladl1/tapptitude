"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_config_1 = require("./server-config");
require("dotenv").config({ path: "./.env" });
//const express = require("express");
const newServer = new server_config_1.Server(parseInt(process.env.port));
newServer.listen();
newServer.connectToDataBase();
//# sourceMappingURL=server.js.map