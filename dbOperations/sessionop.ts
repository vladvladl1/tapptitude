import sessionModel from "../dataBase/sessiondb";
import {Allop} from "./allop";
import {ISession} from "../models/sessionInterface";



export class SessionOp extends Allop<ISession> {
    constructor (){
        super(sessionModel);
    }
    findByUsername( username:string ){
        return sessionModel.findOne({"username": username}, {_id:0});
    }
}
