import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI?.trim()) {
    throw new Error("MONGO_URI is not configured. Set it in backend/.env or the environment.");
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,              // up to 10 simultaneous DB connections
      socketTimeoutMS: 45000,       // close idle sockets after 45s
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed. Check MONGO_URI and database network access:", error.message);
    throw error;
  }
};

export default connectDB;
