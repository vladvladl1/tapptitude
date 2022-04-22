import mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {IUser} from "../models/userInterface";

const userSchema = new Schema({
    email: {type: String},
    username: {type: String},
    password: {type: String},
    drivingLicense: {type: String, default: '1'},
    profilePicture: {type: String, default: '1'},
    date: {type: Date}
});

const userModel = mongoose.model<IUser>("user", userSchema);

export default userModel;