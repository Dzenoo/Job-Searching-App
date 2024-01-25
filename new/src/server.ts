import express from "express";
import cors from "cors";
import http from "http";
import "dotenv/config";

import { connectToDatabase } from "./database/mongoose";
import { initializePrivateRoutes, initializePublicRoutes } from "./routes";
import { Server } from "socket.io";
import { handleError } from "./middlewares/errors";

async function establishDatabaseConnection(): Promise<void> {
  try {
    await connectToDatabase();
  } catch (error) {
    console.log(error);
  }
}

function initializeSockets(io: Server) {
  io.on("connection", (socket) => {
    console.log("WebSocket Connection is established" + socket);
  });
}

function initializeServer(): void {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  app.use(cors());
  app.use(express.json());

  initializePublicRoutes(app);
  initializePrivateRoutes(app);

  initializeSockets(io);

  app.use(handleError);

  server.listen(3000, () => {
    console.log("Server is running on the port 3000");
  });
}

async function initializeApp(): Promise<void> {
  await establishDatabaseConnection();
  initializeServer();
}

initializeApp();
