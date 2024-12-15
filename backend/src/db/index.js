import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    // Fetch the connection string from environment variables
    const mongoDBURL = process.env.MONGODB_URL;

    if (!mongoDBURL) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }


    const connectionInstance = await mongoose.connect(
      `${mongoDBURL}`
    );
    console.log(
      `MongoDB connection !! DB host : ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("Error from Database connection : ", err);
    process.exit(1);
  }
};

export default connectDB;
