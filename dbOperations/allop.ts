import mongoose from "mongoose";



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

    findByEmail(email:string){
       return this.model.findOne({"email": email}, {_id:0});
    }

    findByUsername( username:string ){
        return this.model.findOne({"username": username}, {_id:0});
    }
    findByScooterName(scooterName: string){
        return this.model.findOne({"scooterName": scooterName}, {_id:0});
    }
    deleteByUsername (username: string){
        return this.model.deleteOne({"username": username});
    }
    updatePasswordByUsername (username: string, password: string){
        return this.model.update({"username": username}, {$set: {"password": password}});
    }
    updateDlByUsername(username: string, drivingLicence:string){
        return this.model.updateOne({"username": username}, {$set: {"drivingLicense":drivingLicence}});
    }

}