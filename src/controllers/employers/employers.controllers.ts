import { asyncErrors } from "../../errors";
import { responseServerHandler } from "../../utils/response";
import Employer from "../../models/employer/employers.schemas";
import Seeker from "../../models/seeker/seekers.schemas";

export const signupEmployer = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      if (
        [
          "password",
          "email",
          "name",
          "number",
          "address",
          "size",
          "industry",
        ].filter((property) => !request.body[property]).length > 0
      ) {
        responseServerHandler(
          {
            message: "Please provide valid credentials",
          },
          400,
          response
        );
      }

      const existingEmployer = await Employer.findOne({
        email: request.body.email,
      });

      if (existingEmployer) {
        responseServerHandler(
          { message: "This email already exists, please try again" },
          404,
          response
        );
      }

      const newEmployer = await Employer.create(request.body);

      if (!newEmployer) {
        responseServerHandler(
          {
            message: "Cannot register account, please try again",
          },
          500,
          response
        );
      }

      await newEmployer.save();

      responseServerHandler({ employer: newEmployer._id }, 201, response);
    } catch (error: any) {
      responseServerHandler({ message: error.message }, 400, response);
    }
  }
);

export const loginEmployer = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      if (
        ["password", "email"].filter((property) => !request.body[property])
          .length > 0
      ) {
        responseServerHandler(
          {
            message: "Please provide valid credentials",
          },
          400,
          response
        );
      }

      // @ts-ignore
      const existingEmployer = await Employer.findByCredentials(
        request.body.email,
        request.body.password
      );

      if (!existingEmployer) {
        responseServerHandler(
          {
            message: "Invalid credentials for account, please try again",
          },
          500,
          response
        );
      }

      const employerToken = await existingEmployer.generateAuthToken();

      if (!employerToken) {
        responseServerHandler(
          {
            message: "Cannot login account, please try again",
          },
          500,
          response
        );
      }

      response.cookie("token", employerToken, { httpOnly: true });

      responseServerHandler(
        {
          employer: existingEmployer._id,
          employerToken: employerToken,
        },
        200,
        response
      );
    } catch (error: any) {
      responseServerHandler({ message: error.message }, 400, response);
    }
  }
);

export const getEmployer = asyncErrors(async (request, response) => {
  try {
    const employer = await Employer.findById(request.params.employerId);

    if (!employer) {
      responseServerHandler({ message: "Cannot Find Employer" }, 201, response);
    }

    responseServerHandler({ employer: employer }, 201, response);
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
  }
});

export const followEmployer = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const employerId = request.params.employerId;

    const [employer, seeker] = await Promise.all([
      Employer.findById(employerId),
      Seeker.findById(seekerId),
    ]);

    if (!employer || !seeker) {
      return responseServerHandler(
        { message: "Employer or Seeker cannot be found" },
        201,
        response
      );
    }

    const isFollowing = employer.followers.includes(seekerId);

    if (isFollowing) {
      await Employer.findByIdAndUpdate(employerId, {
        $pull: { followers: seekerId },
      });
      await Seeker.findByIdAndUpdate(seekerId, {
        $pull: { following: employerId },
      });
      responseServerHandler(
        { message: "Employer successfully unfollowed" },
        201,
        response
      );
    } else {
      await Employer.findByIdAndUpdate(employerId, {
        $push: { followers: seekerId },
      });
      await Seeker.findByIdAndUpdate(seekerId, {
        $push: { following: employerId },
      });
      responseServerHandler(
        { message: "Employer successfully followed" },
        201,
        response
      );
    }
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
  }
});
