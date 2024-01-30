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
  app.get("/seeker/profile", authenticateUser, (_request, response) => {
    response.send("Seeker");
  });

  app.get("/seeker/:seekerId", authenticateUser, seekers.getSeeker);
  app.post("/seeker/jobs/:jobId/apply", authenticateUser, jobs.applyToJob);

  app.get("/employer/profile", authenticateUser, (_request, response) => {
    response.send("Employer");
  });

  app.post("/employer/create-new-job", authenticateUser, jobs.createJob);
  app.get("/employer/:employerId", authenticateUser, employers.getEmployer);
  app.patch("/employer/:jobId/edit", authenticateUser, jobs.editJob);
  app.delete("/employer/:jobId/delete", authenticateUser, jobs.deleteJob);
}
