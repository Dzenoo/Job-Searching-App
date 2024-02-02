# Express Routes Initialization

The code initializes public and private routes for an Express application. The routes are organized into three main categories: jobs, employers, and seekers.

## Public Routes (`initializePublicRoutes`)

### Seeker Routes

- `/seeker-signup` (POST): Allows seekers to sign up.
- `/seeker-login` (POST): Allows seekers to log in.

### Employer Routes

- `/employer-signup` (POST): Allows employers to sign up.
- `/employer-login` (POST): Allows employers to log in.

### Job Routes

- `/jobs` (GET): Retrieves a list of jobs.
- `/jobs/:jobId` (GET): Retrieves details of a specific job.

### Employer Routes

- `/employers` (GET): Retrieves a list of employers.
- `/employers/:employerId` (GET): Retrieves details of a specific employer.

## Private Routes (`initializePrivateRoutes`)

### Seeker Routes

- `/seeker` (GET): Retrieves the profile of the logged-in seeker.
- `/seeker/delete-seeker-profile` (DELETE): Deletes the profile of the logged-in seeker.
- `/seeker/edit-seeker-profile` (PATCH): Edits the profile of the logged-in seeker.
- `/seeker/jobs/alerts` (PATCH): Generates job alerts for the logged-in seeker.
- `/seeker/jobs/:jobId/apply` (POST): Applies to a specific job.
- `/seeker/jobs/:jobId/save` (PATCH): Saves a specific job.
- `/seeker/:employerId/follow` (PATCH): Follows a specific employer.
- `/seeker/:employerId/review` (POST): Posts a review for a specific employer.
- `/seeker/:employerId/review` (DELETE): Deletes a review for a specific employer.
- `/seeker/:employerId/review` (PATCH): Edits a review for a specific employer.
- `/seeker/events/:eventId/register` (PATCH): Registers for a specific event.

### Employer Routes

- `/employer` (GET): Retrieves the profile of the logged-in employer.
- `/employer/edit-employer-profile` (PATCH): Edits the profile of the logged-in employer.
- `/employer/delete-employer-profile` (DELETE): Deletes the profile of the logged-in employer.
- `/employer/jobs/create-new-job` (POST): Creates a new job for the logged-in employer.
- `/employer/jobs/:jobId/edit` (PATCH): Edits a specific job posted by the employer.
- `/employer/jobs/:jobId/delete` (DELETE): Deletes a specific job posted by the employer.
- `/employer/seekers` (GET): Retrieves a list of seekers.
- `/employer/events/new` (POST): Creates a new event for the employer.
- `/employer/events/:eventId/edit` (PATCH): Edits a specific event posted by the employer.
- `/employer/events/:eventId/delete` (DELETE): Deletes a specific event posted by the employer.
- `/employer/:seekerId/direct-messages` (POST): Sends direct messages to a specific seeker.

# Middleware and Authentication

- `upload`: Middleware for handling file uploads.
- `authenticateUser`: Middleware for authenticating users.

# Controllers

Controllers are organized into three main categories: `jobs`, `employers`, and `seekers`. Each category contains methods that handle various functionalities.

## `jobs.controllers`

- `getJobs`: Retrieves a list of jobs.
- `getJobById`: Retrieves details of a specific job.
- `deleteJob`: Deletes a specific job.
- `createJob`: Creates a new job.
- `editJob`: Edits a specific job.
- `saveJob`: Saves a specific job.
- `generateJobAlert`: Generates job alerts for a seeker.
- `applyToJob`: Applies to a specific job.

## `employers.controllers`

- `loginEmployer`: Logs in an employer.
- `signupEmployer`: Signs up an employer.
- `getEmployerById`: Retrieves details of a specific employer.
- `getEmployers`: Retrieves a list of employers.
- `getEmployerProfile`: Retrieves the profile of a logged-in employer.
- `editEmployerProfile`: Edits the profile of a logged-in employer.
- `deleteEmployerProfile`: Deletes the profile of a logged-in employer.
- `followEmployer`: Follows a specific employer.
- `reviewEmployer`: Posts a review for a specific employer.
- `deleteReviewEmployer`: Deletes a review for a specific employer.
- `editReviewEmployer`: Edits a review for a specific employer.
- `createNewEvent`: Creates a new event for an employer.
- `editEvent`: Edits a specific event posted by an employer.
- `deleteEvent`: Deletes a specific event posted by an employer.
- `registerEvent`: Registers for a specific event.
- `createDirectMessages`: Sends direct messages to a specific seeker.
- `typeMessage`: Types a message to a specific employer.

## `seekers.controllers`

- `loginSeeker`: Logs in a seeker.
- `signupSeeker`: Signs up a seeker.
- `getSeekerProfile`: Retrieves the profile of a logged-in seeker.
- `editSeekerProfile`: Edits the profile of a logged-in seeker.
- `deleteSeekerProfile`: Deletes the profile of a logged-in seeker.
- `getSeekers`: Retrieves a list of seekers.
- `createDirectMessages`: Sends direct messages to a specific employer.
- `typeMessage`: Types a message to a specific employer.
