import mongoose, { Schema, Document } from "mongoose";

export interface Fraud extends Document {
    fraud_id: String,
    is_fraud: Boolean
}

const fraudSchema: Schema = new Schema({
    fraud_id: {
        type: String,
        unique: true
    },
    is_fraud: {
        type: Boolean,
        required: true
    },
})

export const Fraud = mongoose.model<Fraud>("Fraud", fraudSchema);
