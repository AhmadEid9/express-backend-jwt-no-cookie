import mongoose from "mongoose";
import logMessage from "../utils/logMessage.js";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        logMessage("success","Connected to MongoDB");
    } catch (error) {
        logMessage("error","Error connecting to MongoDB:", error);
    }
};

export default connectToMongoDB;