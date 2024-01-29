import { asyncErrors } from "../../errors";
import { responseServerHandler } from "../../utils/response";
import Seeker from "../../models/seeker/seekers.schemas";

export const signupSeeker = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      if (
        ["password", "email", "last_name", "first_name"].filter(
          (property) => !request.body[property]
        ).length > 0
      ) {
        responseServerHandler(
          {
            message: "Please provide valid credentials",
          },
          400,
          response
        );
      }

      const existingSeeker = await Seeker.findOne({
        email: request.body.email,
      });

      if (existingSeeker) {
        responseServerHandler(
          { message: "This email already exists, please try again" },
          404,
          response
        );
      }

      const newSeeker = await Seeker.create(request.body);

      if (!newSeeker) {
        responseServerHandler(
          {
            message: "Cannot register account, please try again",
          },
          500,
          response
        );
      }

      await newSeeker.save();

      responseServerHandler({ seeker: newSeeker._id }, 201, response);
    } catch (error: any) {
      responseServerHandler({ message: error.message }, 400, response);
    }
  }
);

export const loginSeeker = asyncErrors(
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
      const existingSeeker = await Seeker.findByCredentials(
        request.body.email,
        request.body.password
      );

      if (!existingSeeker) {
        responseServerHandler(
          {
            message: "Invalid credentials for account, please try again",
          },
          500,
          response
        );
      }

      const seekerToken = await existingSeeker.generateAuthToken();

      if (!seekerToken) {
        responseServerHandler(
          {
            message: "Cannot login account, please try again",
          },
          500,
          response
        );
      }

      response.cookie("token", seekerToken, { httpOnly: true });

      responseServerHandler(
        {
          seeker: existingSeeker._id,
          seekerToken: seekerToken,
        },
        200,
        response
      );
    } catch (error: any) {
      responseServerHandler({ message: error.message }, 400, response);
    }
  }
);

export const getSeeker = asyncErrors(async (request, response) => {
  try {
    const seeker = await Seeker.findById(request.params.seekerId);

    if (!seeker) {
      responseServerHandler({ message: "Cannot Find Seeker" }, 201, response);
    }

    responseServerHandler({ seeker: seeker }, 201, response);
  } catch (error) {
    console.log(error);
  }
});
