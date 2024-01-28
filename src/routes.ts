import * as jobs from "./controllers/jobs/jobs.controllers";
import * as employers from "./controllers/employers/employers.controllers";
import * as seekers from "./controllers/seekers/seekers.controllers";
import { Express } from "express";
import { authenticateUser } from "./middlewares/authentication";

export function initializePublicRoutes(app: Express): void {
  app.post("/seeker-signup", seekers.signupSeeker);
  app.post("/seeker-login", seekers.loginSeeker);

  app.post("/employer-signup", employers.signupEmployer);
  app.post("/employer-login", employers.loginEmployer);
}

export function initializePrivateRoutes(app: Express): void {
  app.get("/seeker/profile", authenticateUser, (_request, response) => {
    response.send("Seeker");
  });

  app.get("/employer/profile", authenticateUser, (_request, response) => {
    response.send("Employer");
  });

  app.post("/employer/create-new-job", authenticateUser, jobs.createJob);
  app.get("/employer/:employerId", authenticateUser, employers.getEmployer);
}
