import {Document} from "mongoose";

export interface IAdmin extends Document {
    email: string;
    username :string;
    password: string;
}