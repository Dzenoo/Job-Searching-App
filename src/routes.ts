import * as jobs from "./controllers/jobs/jobs.controllers";
import * as employers from "./controllers/employers/employers.controllers";
import * as seekers from "./controllers/seekers/seekers.controllers";
import upload from "./middlewares/uploads";
import { Express } from "express";
import { authenticateUser } from "./middlewares/authentication";

export function initializePublicRoutes(app: Express): void {
  const { loginSeeker, signupSeeker } = seekers;
  const { loginEmployer, signupEmployer, getEmployerById, getEmployers } =
    employers;
  const { getJobById, getJobs } = jobs;

  app.post("/seeker-signup", signupSeeker);
  app.post("/seeker-login", loginSeeker);

  app.post("/employer-signup", signupEmployer);
  app.post("/employer-login", loginEmployer);

  app.get("/jobs", getJobs);
  app.get("/jobs/:jobId", getJobById);

  app.get("/employers", getEmployers);
  app.get("/employers/:employerId", getEmployerById);
}

export function initializePrivateRoutes(app: Express): void {
  const { getSeekerProfile, editSeekerProfile } = seekers;
  const {
    getEmployerProfile,
    followEmployer,
    reviewEmployer,
    editReviewEmployer,
    deleteReviewEmployer,
    editEmployerProfile,
  } = employers;
  const {
    deleteJob,
    createJob,
    editJob,
    saveJob,
    generateJobAlert,
    applyToJob,
  } = jobs;

  app.get("/seeker", authenticateUser, getSeekerProfile);
  app.post(
    "/seeker/jobs/:jobId/apply",
    authenticateUser,
    upload.single("resume"),
    applyToJob
  );
  app.patch("/seeker/jobs/alerts", authenticateUser, generateJobAlert);
  app.patch("/seeker/jobs/:jobId/save", authenticateUser, saveJob);
  app.patch("/seeker/:employerId/follow", authenticateUser, followEmployer);
  app.post("/seeker/:employerId/review", authenticateUser, reviewEmployer);
  app.delete(
    "/seeker/:employerId/review",
    authenticateUser,
    deleteReviewEmployer
  );
  app.patch("/seeker/:employerId/review", authenticateUser, editReviewEmployer);
  app.patch("/seeker/edit-seeker-profile", authenticateUser, editSeekerProfile);

  app.get("/employer/", authenticateUser, getEmployerProfile);
  app.patch(
    "/employer/edit-employer-profile",
    authenticateUser,
    editEmployerProfile
  );
  app.patch("/employer/jobs/:jobId/edit", authenticateUser, editJob);
  app.post("/employer/jobs/create-new-job", authenticateUser, createJob);
  app.delete("/employer/jobs/:jobId/delete", authenticateUser, deleteJob);
}
