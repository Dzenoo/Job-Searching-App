import * as seekers from "./controllers/seekers/seekers.controllers";
import { Express } from "express";

export function initializePublicRoutes(app: Express): void {
  app.post("/seeker-signup", seekers.signupSeeker);
  app.post("/seeker-login", seekers.loginSeeker);
}

export function initializePrivateRoutes(_app: Express): void {
  // Private Routes
}
