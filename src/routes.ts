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
  const {
    getSeekerProfile,
    editSeekerProfile,
    deleteSeekerProfile,
    getSeekers,
  } = seekers;
  const {
    getEmployerProfile,
    followEmployer,
    reviewEmployer,
    editReviewEmployer,
    deleteReviewEmployer,
    editEmployerProfile,
    deleteEmployerProfile,
    createNewEvent,
    editEvent,
    deleteEvent,
    registerEvent,
    createDirectMessages,
    typeMessage,
  } = employers;
  const {
    deleteJob,
    createJob,
    editJob,
    saveJob,
    generateJobAlert,
    applyToJob,
  } = jobs;
  app.patch("/type-message/:employerId/:seekerId", typeMessage);
  app.get("/seeker", authenticateUser, getSeekerProfile);
  app.delete(
    "/seeker/delete-seeker-profile",
    authenticateUser,
    deleteSeekerProfile
  );
  app.patch("/seeker/edit-seeker-profile", authenticateUser, editSeekerProfile);
  app.patch("/seeker/jobs/alerts", authenticateUser, generateJobAlert);
  app.post(
    "/seeker/jobs/:jobId/apply",
    authenticateUser,
    upload.single("resume"),
    applyToJob
  );
  app.patch("/seeker/jobs/:jobId/save", authenticateUser, saveJob);
  app.patch("/seeker/:employerId/follow", authenticateUser, followEmployer);
  app.post("/seeker/:employerId/review", authenticateUser, reviewEmployer);
  app.delete(
    "/seeker/:employerId/review",
    authenticateUser,
    deleteReviewEmployer
  );
  app.patch("/seeker/:employerId/review", authenticateUser, editReviewEmployer);
  app.patch(
    "/seeker/events/:eventId/register",
    authenticateUser,
    registerEvent
  );

  app.get("/employer", authenticateUser, getEmployerProfile);
  app.patch(
    "/employer/edit-employer-profile",
    authenticateUser,
    editEmployerProfile
  );
  app.delete(
    "/employer/delete-employer-profile",
    authenticateUser,
    deleteEmployerProfile
  );
  app.post("/employer/jobs/create-new-job", authenticateUser, createJob);
  app.patch("/employer/jobs/:jobId/edit", authenticateUser, editJob);
  app.delete("/employer/jobs/:jobId/delete", authenticateUser, deleteJob);
  app.get("/employer/seekers", authenticateUser, getSeekers);
  app.post(
    "/employer/events/new",
    authenticateUser,
    upload.single("image"),
    createNewEvent
  );
  app.patch("/employer/events/:eventId/edit", authenticateUser, editEvent);
  app.delete("/employer/events/:eventId/delete", authenticateUser, deleteEvent);
  app.post(
    "/employer/:seekerId/direct-messages",
    authenticateUser,
    createDirectMessages
  );
}
