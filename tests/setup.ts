import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URI_TEST) throw new Error("MONGO_URI_TEST não definido");

  await mongoose.connect(process.env.MONGO_URI_TEST, { dbName: "test_db" });
  isConnected = true;
};

export const disconnectDB = async () => {
  if (!isConnected) return;
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  isConnected = false;
};
