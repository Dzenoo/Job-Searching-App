import Seeker from "../../models/seeker/seekers.schemas";

import { asyncErrors } from "../../errors";

export const signupSeeker = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      const newSeeker = await Seeker.create(request.body);
      const seekerToken = newSeeker.generateAuthToken();
      newSeeker.save();

      response
        .status(201)
        .send({ seeker: newSeeker, seekerToken: seekerToken });
    } catch (error) {
      console.log(error);
    }
  }
);
