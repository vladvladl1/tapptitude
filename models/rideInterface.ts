import {Document} from "mongoose";

export interface IRide extends Document {
    username: string,
    scooterId: string,
    price: number,
    time: number,
    start: {type:string, coordinates: [number]},
    stop: {type:string, coordinates: [number]},
    dateOfStart: Date
}