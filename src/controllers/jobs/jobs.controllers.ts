import { asyncErrors } from "../../errors";
import { responseServerHandler } from "../../utils/response";
import Job from "../../models/shared/jobs.schemas";
import Employer from "../../models/employer/employers.schemas";

export const createJob = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      // @ts-ignore
      const { employerId } = request.user;

      if (!employerId) {
        responseServerHandler(
          "Unauthorized - Company information missing",
          403,
          response
        );
        return;
      }

      if (request.body.company || !request.body.skills) {
        responseServerHandler(
          "Cannot create job, please try again",
          403,
          response
        );
      }

      const newJob = await Job.create({ ...request.body, company: employerId });

      if (!newJob) {
        responseServerHandler(
          "Cannot create job, please try again",
          403,
          response
        );
      }

      const employer = await Employer.findByIdAndUpdate(employerId, {
        $push: { jobs: newJob._id },
      });

      if (!employer) {
        responseServerHandler(
          "Cannot create job, please try again",
          403,
          response
        );
      }

      responseServerHandler({ job: newJob._id }, 201, response);
    } catch (error: any) {
      responseServerHandler({ message: error.message }, 400, response);
    }
  }
);
