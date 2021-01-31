import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    uuid: String,
    email: String
}

const userSchema: Schema = new Schema({
    uuid: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
})

export const User = mongoose.model<User>("User", userSchema);
