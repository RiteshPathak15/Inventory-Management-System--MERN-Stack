import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'Inventoryp',
      retryWrites: true,
      w: 'majority'
    });
    console.log(`MongoDB Connected: ${conn.connection.host} (Database: ${conn.connection.name})`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
