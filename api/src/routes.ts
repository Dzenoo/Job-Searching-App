import * as jobs from "./controllers/jobs/jobs.controllers";
import * as employers from "./controllers/employers/employers.controllers";
import * as seekers from "./controllers/seekers/seekers.controllers";
import * as applications from "./controllers/applications/applications.controllers";
import * as events from "./controllers/events/events.controllers";
import * as reviews from "./controllers/reviews/reviews.controllers";
import * as messages from "./controllers/messages/messages.controllers";
import upload from "./middlewares/uploads";
import { Express, RequestHandler } from "express";
import { authenticateUser } from "./middlewares/authentication";

enum EXPRESS_APP_METHODS {
  POST = "post",
  GET = "get",
  PATCH = "patch",
  DELETE = "delete",
  PUT = "put",
  OPTIONS = "options",
  HEAD = "head",
  USE = "use",
  CHECKOUT = "checkout",
}

function generateRoutes<
  T extends Express,
  Q extends {
    method: EXPRESS_APP_METHODS;
    path: string;
    handlers: RequestHandler[];
  }[],
>(app: T, routeConfigs: Q, authenticate?: boolean) {
  for (const { method, path, handlers } of routeConfigs) {
    const routeHandlers = authenticate
      ? [authenticateUser, ...handlers]
      : handlers;
    app[method](path, ...routeHandlers);
  }
}

export function initializePublicRoutes(app: Express): void {
  const { loginSeeker, signupSeeker } = seekers;
  const { loginEmployer, signupEmployer, getEmployerById, getEmployers } =
    employers;
  const { getJobById, getJobs } = jobs;

  generateRoutes(app, [
    {
      method: EXPRESS_APP_METHODS.POST,
      path: "/seeker-signup",
      handlers: [signupSeeker],
    },
    {
      method: EXPRESS_APP_METHODS.POST,
      path: "/seeker-login",
      handlers: [loginSeeker],
    },
    {
      method: EXPRESS_APP_METHODS.POST,
      path: "/employer-signup",
      handlers: [signupEmployer],
    },
    {
      method: EXPRESS_APP_METHODS.POST,
      path: "/employer-login",
      handlers: [loginEmployer],
    },
    { method: EXPRESS_APP_METHODS.GET, path: "/jobs", handlers: [getJobs] },
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/jobs/:jobId",
      handlers: [getJobById],
    },
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/employers",
      handlers: [getEmployers],
    },
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/employers/:employerId",
      handlers: [getEmployerById],
    },
  ]);
}

export function initializePrivateRoutes(app: Express): void {
  const { addReview, editReview, deleteReview } = reviews;
  const { createNewEvent, editEvent, deleteEvent, registerEvent, getEvents } =
    events;
  const { createDirectMessages, typeMessage } = messages;
  const { deleteJob, createJob, editJob, saveJob, generateJobAlert } = jobs;
  const {
    getSeekerProfile,
    editSeekerProfile,
    deleteSeekerProfile,
    getSeekers,
    addNewEducation,
    getSeekerById,
    deleteEducation,
  } = seekers;
  const {
    getEmployerProfile,
    followEmployer,
    editEmployerProfile,
    deleteEmployerProfile,
  } = employers;
  const {
    applyToJob,
    updateApplicationStatus,
    generateCoverLetter,
    getApplicationsForJob,
  } = applications;

  generateRoutes(
    app,
    [
      {
        method: EXPRESS_APP_METHODS.PATCH,
        path: "/type-message/:employerId/:seekerId",
        handlers: [typeMessage],
      },
      {
        method: EXPRESS_APP_METHODS.GET,
        path: "/seeker",
        handlers: [getSeekerProfile],
      },
      {
        method: EXPRESS_APP_METHODS.DELETE,
        path: "/seeker/delete-seeker-profile",
        handlers: [deleteSeekerProfile],
      },
      {
        method: EXPRESS_APP_METHODS.PATCH,
        path: "/seeker/edit-seeker-profile",
        handlers: [upload.single("image"), editSeekerProfile],
      },
      {
        method: EXPRESS_APP_METHODS.PATCH,
        path: "/seeker/add-new-education",
        handlers: [addNewEducation],
      },
      {
        method: EXPRESS_APP_METHODS.DELETE,
        path: "/seeker/delete-education/:educationId",
        handlers: [deleteEducation],
      },
      {
        method: EXPRESS_APP_METHODS.PATCH,
        path: "/seeker/jobs/alerts",
        handlers: [generateJobAlert],
      },
      {
        method: EXPRESS_APP_METHODS.POST,
        path: "/seeker/:jobId/generate-cover-letter",
        handlers: [generateCoverLetter],
      },
      {
        method: EXPRESS_APP_METHODS.POST,
        path: "/seeker/jobs/:jobId/apply",
        handlers: [upload.single("resume"), applyToJob],
      },
      {
        method: EXPRESS_APP_METHODS.PATCH,
        path: "/seeker/jobs/:jobId/save",
        handlers: [saveJob],
      },
      {
        method: EXPRESS_APP_METHODS.PATCH,
        path: "/seeker/:employerId/follow",
        handlers: [followEmployer],
      },
      {
        method: EXPRESS_APP_METHODS.POST,
        path: "/seeker/:employerId/review",
        handlers: [addReview],
      },
      {
        method: EXPRESS_APP_METHODS.DELETE,
        path: "/seeker/:employerId/review",
        handlers: [deleteReview],
      },
      {
        method: EXPRESS_APP_METHODS.PATCH,
        path: "/seeker/:employerId/review",
        handlers: [editReview],
      },
      {
        method: EXPRESS_APP_METHODS.GET,
        path: "/seeker/events",
        handlers: [getEvents],
      },
      {
        method: EXPRESS_APP_METHODS.PATCH,
        path: "/seeker/events/:eventId/register",
        handlers: [registerEvent],
      },
      {
        method: EXPRESS_APP_METHODS.GET,
        path: "/employer",
        handlers: [getEmployerProfile],
      },
      {
        method: EXPRESS_APP_METHODS.PATCH,
        path: "/employer/edit-employer-profile",
        handlers: [upload.single("image"), editEmployerProfile],
      },
      {
        method: EXPRESS_APP_METHODS.DELETE,
        path: "/employer/delete-employer-profile",
        handlers: [deleteEmployerProfile],
      },
      {
        method: EXPRESS_APP_METHODS.POST,
        path: "/employer/jobs/create-new-job",
        handlers: [createJob],
      },
      {
        method: EXPRESS_APP_METHODS.PATCH,
        path: "/employer/jobs/:jobId/edit",
        handlers: [editJob],
      },
      {
        method: EXPRESS_APP_METHODS.DELETE,
        path: "/employer/jobs/:jobId/delete",
        handlers: [deleteJob],
      },
      {
        method: EXPRESS_APP_METHODS.GET,
        path: "/employer/applications/:jobId",
        handlers: [getApplicationsForJob],
      },
      {
        method: EXPRESS_APP_METHODS.GET,
        path: "/employer/seekers",
        handlers: [getSeekers],
      },
      {
        method: EXPRESS_APP_METHODS.GET,
        path: "/employer/seekers/:seekerId",
        handlers: [getSeekerById],
      },
      {
        method: EXPRESS_APP_METHODS.POST,
        path: "/employer/events/new",
        handlers: [upload.single("image"), createNewEvent],
      },
      {
        method: EXPRESS_APP_METHODS.PATCH,
        path: "/employer/events/:eventId/edit",
        handlers: [editEvent],
      },
      {
        method: EXPRESS_APP_METHODS.DELETE,
        path: "/employer/events/:eventId/delete",
        handlers: [deleteEvent],
      },
      {
        method: EXPRESS_APP_METHODS.POST,
        path: "/employer/:seekerId/direct-messages",
        handlers: [createDirectMessages],
      },
      {
        method: EXPRESS_APP_METHODS.PATCH,
        path: "/employer/:applicationId/status",
        handlers: [updateApplicationStatus],
      },
    ],
    true
  );
}
