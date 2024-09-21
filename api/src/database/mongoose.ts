import mongoose from "mongoose";

export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL!, {
      dbName: process.env.MONGO_DB_NAME!,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
}
