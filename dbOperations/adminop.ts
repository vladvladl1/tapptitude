import adminModel from "../dataBase/userdb";
import {IAdmin} from "../models/adminInterface";
import {Allop} from "./allop";


export class AdminOp extends Allop<IAdmin> {
    constructor (){
        super(adminModel);
    }
}