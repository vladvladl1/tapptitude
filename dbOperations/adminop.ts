import adminModel from "../dataBase/admindb";
import {IAdmin} from "../models/adminInterface";
import {Allop} from "./allop";


export class AdminOp extends Allop<IAdmin> {
    constructor (){
        super(adminModel);
    }
    findByUsername( username:string ){
        return adminModel.findOne({"username": username}, {_id:0});
    }
    findByEmail(email:string){
        return adminModel.findOne({"email": email}, {_id:0});
    }
}