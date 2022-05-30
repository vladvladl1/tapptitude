import userModel from "../dataBase/userdb";
import {IUser} from "../models/userInterface";
import {Allop} from "./allop";



export class UserOp extends Allop<IUser> {

    constructor (){
        super(userModel);
    }
    updateUserStatus(username:string, status:string){
        return userModel.updateOne({"username": username}, {$set: {"status":status}});
    }
    updateEmail(username: string, email: string){
        return userModel.updateOne({"username": username}, {$set: {"email": email}});
    }
    updateUsername(username: string, newUsername: string){
        return userModel.updateOne({"username":username}, {$set: {"username": newUsername}});
    }
    updateDlByUsername(username: string, drivingLicence:string){
        return userModel.updateOne({"username": username}, {$set: {"drivingLicense":drivingLicence}});
    }
    updatePasswordByUsername (username: string, password: string){
        return userModel.updateOne({"username": username}, {$set: {"password": password}});
    }
    findByUsername( username:string ){
        return userModel.findOne({"username": username}, {_id:0});
    }
    findByEmail(email:string){
        return userModel.findOne({"email": email});
    }
    findAllByUsername(username: string){
        return userModel.find({"username": username});
    }
}





/*class A<T> {
    findAll():T[]{

        return [];
    }
}

class B extends A<string>{

}

let y:B = new  B();
y.findAll();*/







