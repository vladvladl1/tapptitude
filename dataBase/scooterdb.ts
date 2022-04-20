import mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {IScooter} from "../models/scooterInterface";


const scooterSchema = new Schema({
    scooterName: {type: String},
    battery: {type: Number},
    lockedStatus: {type: String},
    bookedStatus: {type: String},
    lastSeenDate: {type: Date},
    gpsCoordinates: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'],
            required: false,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true,
            default: [10, 12]
        }}
});

const scooterModel = mongoose.model<IScooter>("scooter", scooterSchema);

export default scooterModel;