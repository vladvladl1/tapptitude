import {Document} from "mongoose";


export interface ISession extends Document{
    username: string;
    token: string;
}