import Seeker from "../../models/seeker/seekers.schemas";
import { asyncErrors } from "../../errors";

export const signupSeeker = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      const newSeeker = await Seeker.create(request.body);
      const seekerToken = await newSeeker.generateAuthToken();
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
    // @ts-ignore
    const existingSeeker = await Seeker.findByCredentials(
      request.body.email,
      request.body.password
    );
    const seekerToken = await existingSeeker.generateAuthToken();

    response
      .status(200)
      .send({ seeker: existingSeeker, seekerToken: seekerToken });
    try {
    } catch (error: any) {
      response.status(400).json({ message: error.message });
    }
  }
);
