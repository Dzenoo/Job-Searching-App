import zod from "zod";

export const EditableSeekerInformationsSchemas = zod.object({
  first_name: zod.string().min(1).max(30),
  last_name: zod.string().min(1).max(30),
  biography: zod.string().min(1).max(300),
});
