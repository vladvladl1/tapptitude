import {Allop, Position} from "./allop";
import {IRide} from "../models/rideInterface";
import rideModel from "../dataBase/ridedb";



export class RideOp extends Allop<IRide> {
    constructor (){
        super(rideModel);
    }

    updateStopRide(username:string, price:number, time: number, stop: Position){
        return rideModel.updateOne({"username": username, "time": 0}, {$set: {"price": price, "time": time, "stop": stop}});
    }

    findOngoingRideByUsername(username: string){
        return rideModel.findOne({"username": username, "time": 0});
    }
    updateIntermediaryOngoingRideByScooterId(scooterId: string, intermediary: [number, number][], distance){
        return rideModel.updateOne({"realScooterId":scooterId}, {$set:{"intermediary":intermediary, "distance":distance}});
    }
    findByUsername( username:string ){
        return rideModel.findOne({"username": username}, {_id:0});
    }
    findAllByUsername(username: string){
        return rideModel.findOne({"username": username});
    }
    updateOngoingRide(username:string, intermediary: [number, number][], distance:number){
        return rideModel.updateOne({"username": username, "time": 0}, {$set: {"intermediary":intermediary, distance:distance}});
    }
    findOngoingByScooterId(scooterId: string){
        return rideModel.findOne({"realScooterId":scooterId});
    }
}