import {Document} from "mongoose";

export interface IRide extends Document {
    username: string,
    scooterId: string,
    price: number,
    time: number,
    start: {type:string, coordinates: [number, number]},
    stop: {type:string, coordinates: [number, number]},
    intermediary:  [number, number][],
    distance:number,
    dateOfStart: Date
}

