import {Document} from "mongoose";

export interface IScooter extends Document {
    battery: number,
    lockedStatus: string,
    bookedStatus: string,
    lastSeenDate: Date,
    gpsCoordinates: string

}