import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";

import { connectToDatabase } from "./database/mongoose";
import { initializePrivateRoutes, initializePublicRoutes } from "./routes";
import { Server } from "socket.io";
import { handleError } from "./middlewares/errors";

dotenv.config({ path: ".env", override: true });

let io: Server;

async function establishDatabaseConnection(): Promise<void> {
  try {
    await connectToDatabase();
  } catch (error) {
    console.log(error);
  }
}

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

  server.listen(3000, () => {
    console.log("Server is running on the port 3000");
  });
}

async function initializeApp(): Promise<void> {
  await establishDatabaseConnection();
  initializeServer();
}

initializeApp();

export { io };
