import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`
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