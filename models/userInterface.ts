import {Document} from "mongoose";


export interface IUser extends Document{
    email: string;
    username: string;
    password: string;
    drivingLicense: string;
    profilePicture: string;
    date: Date;
    status: string;
}