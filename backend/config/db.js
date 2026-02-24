import mongoose from "mongoose";

export const connectDB = async () => {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/MediCare";
    try {
        await mongoose.connect(uri, { family: 4, connectTimeoutMS: 10000 });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        console.warn("Continuing without DB connection (some routes may fail).");
    }
}