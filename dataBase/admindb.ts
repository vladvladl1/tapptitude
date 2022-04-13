import mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {IAdmin} from "../models/adminInterface";

const adminSchema = new Schema({
    email: {type: String},
    username: {type: String},
    password: {type: String},
});

const adminModel = mongoose.model<IAdmin>("admin", adminSchema);

export default adminModel;