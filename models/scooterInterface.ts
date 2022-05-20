import {Document} from "mongoose";

export interface IScooter extends Document {
    scooterId: string,
    realScooterId: string,
    battery: number,
    lockedStatus: string,
    bookedStatus: string,
    lastSeenDate: Date,
    pin: number,
    isDummy: string,
    charging: string,
    gpsCoordinates: {type:string, coordinates: [number, number]}
}