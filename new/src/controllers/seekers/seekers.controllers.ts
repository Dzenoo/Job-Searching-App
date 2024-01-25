import Seeker from "../../models/seeker/seekers.schemas";
import { asyncErrors } from "../../errors";

export const signupSeeker = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      if (
        ["password", "email", "last_name", "first_name"].filter(
          (property) => !request.body[property]
        ).length > 0
      ) {
        response.status(400).send({
          message: "Please provide valid credentials",
        });
      }

      const existingSeeker = await Seeker.findOne({
        email: request.body.email,
      });

      if (existingSeeker) {
        response
          .status(400)
          .json({ message: "This email already exists, please try again" });
      }

      const newSeeker = await Seeker.create(request.body);
      const seekerToken = await newSeeker.generateAuthToken();

      if (!seekerToken || !newSeeker) {
        response.status(500).send({
          message: "Cannot register account, please try again",
        });
      }

      await newSeeker.save();

      response
        .status(201)
        .send({ seeker: newSeeker, seekerToken: seekerToken });
    } catch (error: any) {
      response.status(400).json({ message: error.message });
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
        response.status(400).send({
          message: "Please provide valid credentials",
        });
      }

      // @ts-ignore
      const existingSeeker = await Seeker.findByCredentials(
        request.body.email,
        request.body.password
      );

      if (!existingSeeker) {
        response.status(500).send({
          message: "Invalid credentials for account, please try again",
        });
      }

      const seekerToken = await existingSeeker.generateAuthToken();

      if (!seekerToken) {
        response.status(500).send({
          message: "Cannot login account, please try again",
        });
      }

      response
        .status(200)
        .send({ seeker: existingSeeker, seekerToken: seekerToken });
    } catch (error: any) {
      response.status(400).json({ message: error.message });
    }
  }
);
