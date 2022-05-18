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
        return scooterModel.find({"scooterId": scooterId, gpsCoordinates : {$near: {$geometry: position, $maxDistance: maxRange}}});
    }
    findNearby(maxRange: number, position: Position){
        return scooterModel.find({gpsCoordinates : {$near: {$geometry: position, $maxDistance: maxRange}}})
    }
    findByScooterId(scooterId: string){
        return scooterModel.findOne({"scooterId": scooterId}, {_id:0});
    }
}