import {Document} from "mongoose";

export interface IScooter extends Document {
    scooterName: string,
    battery: number,
    lockedStatus: string,
    bookedStatus: string,
    lastSeenDate: Date,
    gpsCoordinates: {type:string, coordinates: [number]}
}