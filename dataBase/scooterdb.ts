import mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {IScooter} from "../models/scooterInterface";


const scooterSchema = new Schema({
    scooterId: {type: String},
    battery: {type: Number},
    lockedStatus: {type: String},
    bookedStatus: {type: String},
    lastSeenDate: {type: Date},
    pin: {type: Number},
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
scooterSchema.index({gpsCoordinates: "2dsphere"});
const scooterModel = mongoose.model<IScooter>("scooter", scooterSchema);

export default scooterModel;