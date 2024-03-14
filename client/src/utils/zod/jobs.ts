import zod from "zod";

export const ApplyToJobSchemas = zod.object({
  coverLetter: zod.string().optional(),
});
