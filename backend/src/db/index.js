import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({
  path: "./.env",
});

const connectDB = async () => {
  try {
    // Fetch the connection string from environment variables
    const mongoDBURL = `mongodb+srv://Ritesh_Pathak:rits6184@ritscluster0.8fjww.mongodb.net/Inventory` || process.env.MONGODB_URL;
    console.log("MongoDB Connection String: ", mongoDBURL);

    if (!mongoDBURL) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }


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
