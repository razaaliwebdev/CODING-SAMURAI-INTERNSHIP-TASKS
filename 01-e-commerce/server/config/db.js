import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("MongoDb connnected successfully...");
    } catch (error) {
        console.log("Failed to connect DB..", error);
        process.exit(1);
    }
}

export default connectDb;