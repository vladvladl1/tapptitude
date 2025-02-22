import scooterModel from "../dataBase/scooterdb";
import {IScooter} from "../models/scooterInterface";
import {Allop, Position} from "./allop";



export class ScooterOp extends Allop<IScooter> {
    constructor (){
        super(scooterModel);
    }

    updateLockedByName (name: string, locked: string){
        return scooterModel.updateOne({"scooterId": name}, {$set: {"lockedStatus": locked}});
    }
    findNearbyById(scooterId: string, position: Position, maxRange: number){
        return scooterModel.findOne({"scooterId": scooterId, gpsCoordinates : {$near: {$geometry: position, $maxDistance: maxRange}}});
    }
    findNearby(maxRange: number, position: Position){
        return scooterModel.find({gpsCoordinates : {$near: {$geometry: position, $maxDistance: maxRange}}, bookedStatus:"unbooked"});
    }
    findScooterIdByReal(scooterId:string){
        return scooterModel.findOne({"realScooterId":scooterId});
    }

    findByScooterId(scooterId: string){
        return scooterModel.findOne({"scooterId": scooterId}, {_id:0});
    }
    updateRealScooter(scooterId:string, charging: string, battery:number, lockState:string){
        return scooterModel.updateOne({"realScooterId":scooterId},{$set: {"battery":battery, "charging":charging, "lockedStatus":lockState}});
    }
    updateBookedById(scooterId:string, status){
        return scooterModel.updateOne({"scooterId":scooterId},{$set:{"bookedStatus":status}});
    }

}