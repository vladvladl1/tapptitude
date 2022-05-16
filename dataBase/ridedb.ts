import mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {IRide} from "../models/rideInterface";


const rideSchema = new Schema({
    username: {type: String},
    scooterId: {type: String},
    price: {type:Number},
    time: {type: Number},
    start: {type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'],
            required: false,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true,
            default: [10, 12]
        }},
    stop: {type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'],
            required: false,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true,
            default: [0, 0]
        }},
    intermediary: {type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'],
            required: false,
            default: 'Point'
        },
        coordinates: {
            type: [[Number]],
            required: true,
            default: [0, 0]
        }},

    distance: {type: Number, default: 0},
    dateOfStart: {type: Date}
});

const rideModel = mongoose.model<IRide>('ride', rideSchema);

export default rideModel;


