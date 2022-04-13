import express from "express";
import mongoose from "mongoose";
import appRoute from "./routes/route";
import config from "config";
require("dotenv").config({path:"./.env"});

export class Server {
    public srv: express.Application;
    public port:number;
    appRoutes = appRoute;

    constructor(port){
        this.srv = express();
        this.port = port;
        this.srv.use("/", this.appRoutes);
    }
   public listen(){
       this.srv.listen(this.port, () => {
           console.log("LISTENING TO PORT:" + this.port);
       })
   }
   public connectToDataBase(){
       mongoose.connect(process.env.db);
       console.log("CONEXION TO DATABASE ESTABLISHED");
   }

}
