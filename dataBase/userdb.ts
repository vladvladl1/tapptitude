import mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {IUser} from "../models/userInterface";

const userSchema = new Schema({
    email: {type: String},
    username: {type: String},
    password: {type: String},
    drivingLicense: {type: String}
});

const userModel = mongoose.model<IUser>("user", userSchema);

export default userModel;