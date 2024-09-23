import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/entregacoder";

export const initMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Conectado a la base de datos de MongoDB");
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
};
