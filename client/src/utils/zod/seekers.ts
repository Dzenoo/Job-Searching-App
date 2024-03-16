import zod from "zod";

export const EditableSeekerInformationsSchemas = zod.object({
  first_name: zod.string().min(1).max(30),
  last_name: zod.string().min(1).max(30),
  biography: zod.string().min(1).max(300),
});

export const EditableSeekerSocialsSchemas = zod.object({
  portfolio: zod.string().optional(),
  linkedin: zod.string().optional(),
  github: zod.string().optional(),
});
