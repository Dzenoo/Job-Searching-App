import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
const port = process.env.PORT || 7000;

import { connectToDatabase } from "./database/mongoose";
import { initializePrivateRoutes, initializePublicRoutes } from "./routes";
import { handleError } from "./middlewares/error.middleware";
import { Server } from "socket.io";
import { OpenAI } from "openai";

dotenv.config({ path: ".env", override: true });

let io: Server;

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

export const initializeSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

function initializeServer(): void {
  const app = express();
  const server = http.createServer(app);

  app.use(cors());
  app.use(express.json());

  initializePublicRoutes(app);

  initializePrivateRoutes(app);

  initializeSocket(server);

  app.use(handleError);

  server.listen(port, () => {
    console.log("Server is running on the port 7000");
  });
}

async function initializeApp(): Promise<void> {
  await establishDatabaseConnection();
  initializeServer();
}

initializeApp();

export { io };
