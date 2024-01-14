import mongoose from "mongoose";

let connection: any;

const connectToDb = async () => {
    try {
        if (!connection) {
            connection = await mongoose.connect(process.env.MONGODB_URI || "");
            console.log("Connected to MongoDB");
        } else {
            return
        }
        return connection;
    } catch (error) {
        console.error("Failed to connect to database", error);
    }
    return;
};

export default connectToDb;
