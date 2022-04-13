import scooterModel from "../dataBase/userdb";
import {IScooter} from "../models/scooterInterface";
import {Allop} from "./allop";



export class ScooterOp extends Allop<IScooter> {
    constructor (){
        super(scooterModel);
    }
}