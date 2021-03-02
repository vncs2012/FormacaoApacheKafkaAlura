import mongoose, { Schema, Document } from "mongoose";

export interface OrderM extends Document {
    uuid: String
}

const orderMSchema: Schema = new Schema({
    uuid: {
        type: String,
        unique: true,
        required: true,
    }
})

export const OrderM = mongoose.model<OrderM>("OrderM", orderMSchema);
