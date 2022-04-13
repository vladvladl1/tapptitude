import {Allop} from "./allop";
import {IRide} from "../models/rideInterface";
import rideModel from "../dataBase/ridedb";



export class RideOp extends Allop<IRide> {
    constructor (){
        super(rideModel);
    }
}