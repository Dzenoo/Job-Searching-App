import Seeker from "../../models/seeker/seekers.schemas";

import { asyncErrors } from "../../errors";

export const signupSeeker = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      const newSeeker = await Seeker.create(request.body);
      const seekerToken = await newSeeker.generateAuthToken();
      newSeeker.save();

      response
        .status(201)
        .send({ seeker: newSeeker, seekerToken: seekerToken });
    } catch (error: any) {
      response.status(400).json({ message: error.message });
    }
  }
);
