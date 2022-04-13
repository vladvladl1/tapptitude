import mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {IUser} from "../models/userInterface";

const sessionSchema = new Schema({
    username: {type: String},
    token: {type: JSON}
});

const sessionModel = mongoose.model<IUser>("session", sessionSchema);

export default sessionModel;