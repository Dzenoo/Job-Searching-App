import { asyncErrors } from "../../errors";
import { responseServerHandler } from "../../utils/response";
import Employer from "../../models/employer/employers.schemas";

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
  } catch (error) {
    console.log(error);
  }
});
