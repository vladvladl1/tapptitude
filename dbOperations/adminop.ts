import adminModel from "../dataBase/admindb";
import {IAdmin} from "../models/adminInterface";
import {Allop} from "./allop";


export class AdminOp extends Allop<IAdmin> {
    constructor (){
        super(adminModel);
    }
}