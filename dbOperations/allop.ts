import mongoose from "mongoose";



export class Allop<T> {
    model = mongoose.Model;

    constructor(model){
        this.model = model;
    }

    createObject(object: T):Promise<T>{
        return this.model.create(object);
    }

    findByEmail(email:string){
       return this.model.findOne({"email": email}, {_id:0});
    }

    findByUsername( username:string ){
        return this.model.findOne({"username": username}, {_id:0});
    }

    deleteByUsername (username: string){
        return this.model.deleteOne({"username": username});
    }

}