import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectToDatabase } from "./database/mongoose";
import { initializePublicRoutes } from "./routes";

async function establishDatabaseConnection(): Promise<void> {
  try {
    await connectToDatabase();
  } catch (error) {
    console.log(error);
  }
}

function initializeExpress(): void {
  const app = express();

  app.use(cors());
  app.use(express.json());

  initializePublicRoutes(app);

  app.listen(process.env.PORT || 3000);
}

async function initializeApp(): Promise<void> {
  await establishDatabaseConnection();
  initializeExpress();
}

initializeApp();
