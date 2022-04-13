"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_config_1 = require("./server-config");
const express = require("express");
const newServer = new server_config_1.Server(5000);
newServer.listen();
newServer.connectToDataBase();
//# sourceMappingURL=server.js.map