import mongoose from "mongoose";
import {Schema, Document} from "mongoose";
import {ISession} from "../models/sessionInterface";

const sessionSchema = new Schema({
    username: {type: String},
    token: {type: String}
});

const sessionModel = mongoose.model<ISession>("session", sessionSchema);

export default sessionModel;