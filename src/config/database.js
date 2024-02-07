// Required external Modules
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

// Mongo DB Connection String
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI not available in ENV");
  process.exit(1);
}

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI, {dbName: "bookstore" });
    console.log("Connected To MONGODB");
  } catch (error) {
    console.log(error.message);
  }
};

export default mongoose;