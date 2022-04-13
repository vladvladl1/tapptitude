import {Document} from "mongoose";

export interface IRide extends Document {
    username: string,
    price: number,
    time: number,
    start: string,
    stop: string
}