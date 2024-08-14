import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const mongoURL: string = process.env.MONGO_DB_URI as string; // Assert that the variable is a string

const connectmongo = async () => {
    try {
        if (!mongoURL) {
            throw new Error("MONGO_DB_URL is not defined");
        }
        await mongoose.connect(mongoURL);
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectmongo;
