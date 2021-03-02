import mongoose, { Schema, Document } from "mongoose";

export interface Fraud extends Document {
    uuid: String,
    is_fraud: Boolean
}

const fraudSchema: Schema = new Schema({
    uuid: {
        type: String,
        unique: true,
        required: true,
    },
    is_fraud: {
        type: Boolean,
        required: true,
    },
})

export const Fraud = mongoose.model<Fraud>("Fraud", fraudSchema);
