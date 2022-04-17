import config from "config";
import { Server } from "./server-config"
import userModel from "./dataBase/userdb";
import {Schema} from "mongoose";
import mongoose from "mongoose";
require("dotenv").config({path:"./.env"});

//const express = require("express");

const newServer = new Server(parseInt(process.env.PORT) || 5000);


newServer.listen();

newServer.connectToDataBase();

