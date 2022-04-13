import mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {IRide} from "../models/rideInterface";


const cursaSchema = new Schema({
    username: {type: String},
    pret: {type:Number},
    durata: {type: Number},
    pornire: {type: String},
    oprire: {type: String}
});

const rideModel = mongoose.model<IRide>('ride', cursaSchema);

export default rideModel;


