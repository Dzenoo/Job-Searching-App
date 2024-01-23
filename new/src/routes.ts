import { Express } from "express";

export function initializePublicRoutes(app: Express): void {
  app.get("/", (_request, response) => {
    response.send("Express");
  });
}

export function initializePrivateRoutes(_app: Express): void {
  // Private Routes
}
