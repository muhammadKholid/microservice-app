// Import necessary modules
import mongoose, { Schema, Document, Types, ObjectId } from "mongoose";

// Define the interface for User document
export interface IProduct extends Document {
    _id?: ObjectId,
    name: string;
    description: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Create a schema for the User model
const productSchema: Schema<IProduct> = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        status: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Create and export the User model
export default mongoose.model<IProduct>("Product", productSchema);