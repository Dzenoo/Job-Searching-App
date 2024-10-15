import "./utils/cleanup";
import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";

import { connectToDatabase } from "./database/mongoose";
import { initializePrivateRoutes, initializePublicRoutes } from "./routes";
import { handleError } from "./middlewares/error.middleware";
import { OpenAI } from "openai";

dotenv.config({ path: ".env", override: true });

async function establishDatabaseConnection(): Promise<void> {
  try {
    await connectToDatabase();
  } catch (error) {
    console.log(error);
  }
}

export const initializeChatbots = (): OpenAI => {
  const openai = new OpenAI({
    apiKey: process.env.CHAT_API_KEY,
  });

  return openai;
};

const port = process.env.PORT || 7000;

function initializeServer(): void {
  const app = express();
  const server = http.createServer(app);

  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(express.json());

  initializePublicRoutes(app);

  initializePrivateRoutes(app);

  app.use(handleError);

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

async function initializeApp(): Promise<void> {
  await establishDatabaseConnection();
  initializeServer();
}

initializeApp();
