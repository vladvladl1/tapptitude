import mongoose from "mongoose";

type Position = {type:string, coordinates:[number]};

export class Allop<T> {
    model = mongoose.Model;

    constructor(model){
        this.model = model;
    }

    createObject(object: T):Promise<T>{
        return this.model.create(object);
    }

    findAll(){
        return this.model.find({});
    }
    findAllByUsername(username: string){
        return this.model.find({"username": username});
    }
    findByPin(pin: number){
        return this.model.findOne({"pin": pin}, {_id:0});
    }

    findByEmail(email:string){
       return this.model.findOne({"email": email}, {_id:0});
    }

    findByUsername( username:string ){
        return this.model.findOne({"username": username}, {_id:0});
    }
    findByScooterId(scooterId: string){
        return this.model.findOne({"scooterId": scooterId}, {_id:0});
    }
    findOngoingRideByUsername(username: string){
        return this.model.findOne({"username": username, "time": 0});
    }
    deleteByUsername (username: string){
        return this.model.deleteOne({"username": username});
    }
    deleteAll(){
        return  this.model.deleteMany({});
    }
    updatePasswordByUsername (username: string, password: string){
        return this.model.updateOne({"username": username}, {$set: {"password": password}});
    }
    updateLockedByName (name: string, locked: string){
        return this.model.updateOne({"scooterName": name}, {$set: {"lockedStatus": locked}});
    }
    updateLockedByPin (pin: number, locked: string){
        return this.model.updateOne({"pin": pin}, {$set: {"lockedStatus": locked}});
    }
    updateDlByUsername(username: string, drivingLicence:string){
        return this.model.updateOne({"username": username}, {$set: {"drivingLicense":drivingLicence}});
    }
    updateStopRide(username:string, price:number, time: number, stop: Position){
        return this.model.updateOne({"username": username, "time": 0}, {$set: {"price": price, "time": time, "stop": stop}});
    }

}