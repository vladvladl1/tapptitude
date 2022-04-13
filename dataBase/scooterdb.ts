import mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {IScooter} from "../models/scooterInterface";

const scooterSchema = new Schema({
    batter: {type: Number},
    lockedStatus: {type: String},
    bookedStatus: {type: String},
    lastSeenDate: {type: Date},
    gpsCoordinates: {type: String}
});

const scooterModel = mongoose.model<IScooter>("scooter", scooterSchema);

export default scooterModel;