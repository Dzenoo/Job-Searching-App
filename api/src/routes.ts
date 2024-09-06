import { Express, RequestHandler } from "express";
import upload from "./middlewares/upload.middleware";
import { authenticateUser } from "./middlewares/auth.middleware";

// Import controllers
import * as notifications from "./controllers/notifications.controllers";
import * as jobs from "./controllers/jobs.controllers";
import * as employers from "./controllers/employers.controllers";
import * as seekers from "./controllers/seekers.controllers";
import * as applications from "./controllers/applications.controllers";
import * as events from "./controllers/events.controllers";
import * as reviews from "./controllers/reviews.controllers";
import * as messages from "./controllers/messages.controllers";

// Enum for HTTP methods
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

// Generic function to generate routes
function generateRoutes<
  T extends Express,
  Q extends {
    method: EXPRESS_APP_METHODS;
    path: string;
    handlers: RequestHandler[];
  }[],
>(app: T, routeConfigs: Q, authenticate: boolean = false) {
  for (const { method, path, handlers } of routeConfigs) {
    const routeHandlers = authenticate
      ? [authenticateUser, ...handlers]
      : handlers;
    app[method](path, ...routeHandlers);
  }
}

// Public routes configuration
export function initializePublicRoutes(app: Express): void {
  const publicRoutes = [
    {
      method: EXPRESS_APP_METHODS.POST,
      path: "/seeker-signup",
      handlers: [seekers.signupSeeker],
    },
    {
      method: EXPRESS_APP_METHODS.POST,
      path: "/seeker-login",
      handlers: [seekers.loginSeeker],
    },
    {
      method: EXPRESS_APP_METHODS.POST,
      path: "/employer-signup",
      handlers: [employers.signupEmployer],
    },
    {
      method: EXPRESS_APP_METHODS.POST,
      path: "/employer-login",
      handlers: [employers.loginEmployer],
    },
  ];

  generateRoutes(app, publicRoutes, false);
}

// Private routes configuration
export function initializePrivateRoutes(app: Express): void {
  const privateRoutes = [
    // Notifications
    {
      method: EXPRESS_APP_METHODS.PATCH,
      path: "/notifications/:notification",
      handlers: [notifications.readNotificationsData],
    },
    // Messages
    {
      method: EXPRESS_APP_METHODS.PATCH,
      path: "/create-message/:employerId/:seekerId",
      handlers: [messages.createMessage],
    },
    {
      method: EXPRESS_APP_METHODS.POST,
      path: "/employer/messages/:seekerId",
      handlers: [messages.createDirectMessages],
    },
    // Seeker routes
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/seeker",
      handlers: [seekers.getSeekerProfile],
    },
    {
      method: EXPRESS_APP_METHODS.DELETE,
      path: "/seeker/delete-seeker-profile",
      handlers: [seekers.deleteSeekerProfile],
    },
    {
      method: EXPRESS_APP_METHODS.PATCH,
      path: "/seeker/edit-seeker-profile",
      handlers: [upload.single("image"), seekers.editSeekerProfile],
    },
    {
      method: EXPRESS_APP_METHODS.PATCH,
      path: "/seeker/add-new-education",
      handlers: [seekers.createEducation],
    },
    {
      method: EXPRESS_APP_METHODS.DELETE,
      path: "/seeker/delete-education/:educationId",
      handlers: [seekers.deleteEducation],
    },
    {
      method: EXPRESS_APP_METHODS.POST,
      path: "/seeker/:jobId/generate-cover-letter",
      handlers: [applications.generateCoverLetter],
    },
    {
      method: EXPRESS_APP_METHODS.POST,
      path: "/seeker/jobs/:jobId/apply",
      handlers: [upload.single("resume"), applications.applyToJob],
    },
    {
      method: EXPRESS_APP_METHODS.PATCH,
      path: "/seeker/jobs/:jobId/save",
      handlers: [jobs.saveJob],
    },
    {
      method: EXPRESS_APP_METHODS.PATCH,
      path: "/seeker/jobs/alerts",
      handlers: [jobs.generateJobAlert],
    },
    {
      method: EXPRESS_APP_METHODS.PATCH,
      path: "/seeker/:employerId/follow",
      handlers: [employers.followEmployer],
    },
    {
      method: EXPRESS_APP_METHODS.POST,
      path: "/seeker/:employerId/review",
      handlers: [reviews.createReview],
    },
    {
      method: EXPRESS_APP_METHODS.DELETE,
      path: "/seeker/:employerId/review",
      handlers: [reviews.deleteReview],
    },
    {
      method: EXPRESS_APP_METHODS.PATCH,
      path: "/seeker/:employerId/review",
      handlers: [reviews.editReview],
    },
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/seeker/employers",
      handlers: [employers.getEmployers],
    },
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/seeker/employers/:employerId",
      handlers: [employers.getEmployerById],
    },
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/seeker/jobs",
      handlers: [jobs.getJobs],
    },
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/seeker/jobs/:jobId",
      handlers: [jobs.getJobById],
    },
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/seeker/events",
      handlers: [events.getEvents],
    },
    {
      method: EXPRESS_APP_METHODS.PATCH,
      path: "/seeker/events/:eventId/register",
      handlers: [events.registerEvent],
    },
    // Employer routes
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/employer/messages",
      handlers: [employers.getDirectMessages],
    },
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/employer/messages/:seekerId",
      handlers: [employers.getMessageRoom],
    },
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/employer",
      handlers: [employers.getEmployerProfile],
    },
    {
      method: EXPRESS_APP_METHODS.PATCH,
      path: "/employer/edit-employer-profile",
      handlers: [upload.single("image"), employers.editEmployerProfile],
    },
    {
      method: EXPRESS_APP_METHODS.DELETE,
      path: "/employer/delete-employer-profile",
      handlers: [employers.deleteEmployerProfile],
    },
    {
      method: EXPRESS_APP_METHODS.POST,
      path: "/employer/jobs/create-new-job",
      handlers: [jobs.createJob],
    },
    {
      method: EXPRESS_APP_METHODS.PATCH,
      path: "/employer/jobs/:jobId/edit",
      handlers: [jobs.editJob],
    },
    {
      method: EXPRESS_APP_METHODS.DELETE,
      path: "/employer/jobs/:jobId/delete",
      handlers: [jobs.deleteJob],
    },
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/employer/jobs/:jobId",
      handlers: [employers.getJobById],
    },
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/employer/applications/:jobId",
      handlers: [applications.getApplicationsForJob],
    },
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/employer/seekers",
      handlers: [seekers.getSeekers],
    },
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/employer/seekers/:seekerId",
      handlers: [seekers.getSeekerById],
    },
    {
      method: EXPRESS_APP_METHODS.POST,
      path: "/employer/events/new",
      handlers: [upload.single("image"), events.createEvent],
    },
    {
      method: EXPRESS_APP_METHODS.PATCH,
      path: "/employer/events/:eventId/edit",
      handlers: [events.editEvent],
    },
    {
      method: EXPRESS_APP_METHODS.DELETE,
      path: "/employer/events/:eventId/delete",
      handlers: [events.deleteEvent],
    },
    {
      method: EXPRESS_APP_METHODS.PATCH,
      path: "/employer/:applicationId/status",
      handlers: [applications.updateApplicationStatus],
    },
    {
      method: EXPRESS_APP_METHODS.GET,
      path: "/employer/analytics",
      handlers: [employers.getEmployerAnalytics],
    },
  ];

  generateRoutes(app, privateRoutes, true);
}
