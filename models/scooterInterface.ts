import {Document} from "mongoose";

export interface IScooter extends Document {
    scooterName: string,
    battery: number,
    lockedStatus: string,
    bookedStatus: string,
    lastSeenDate: Date,
    pin: number,
    gpsCoordinates: {type:string, coordinates: [number]}
}