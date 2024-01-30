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

  app.get("/jobs", jobs.getJobs);
  app.get("/jobs/:jobId", jobs.getJobById);
}

export function initializePrivateRoutes(app: Express): void {
  app.get("/seeker/:seekerId", authenticateUser, seekers.getSeeker);
  app.post("/seeker/jobs/:jobId/apply", authenticateUser, jobs.applyToJob);
  app.patch("/seeker/jobs/alerts", authenticateUser, jobs.generateJobAlert);
  app.patch("/seeker/jobs/:jobId/save", authenticateUser, jobs.saveJob);

  app.get("/employer/:employerId", authenticateUser, employers.getEmployer);
  app.patch("/employer/jobs/:jobId/edit", authenticateUser, jobs.editJob);
  app.post("/employer/jobs/create-new-job", authenticateUser, jobs.createJob);
  app.delete("/employer/jobs/:jobId/delete", authenticateUser, jobs.deleteJob);
}
