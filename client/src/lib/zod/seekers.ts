import zod from "zod";

export const EditableSeekerInformationsSchemas = zod.object({
  first_name: zod.string().min(1).max(30),
  last_name: zod.string().min(1).max(30),
  biography: zod.string().max(3000),
  overview: zod.string().max(30),
});

export const EditableSeekerSocialsSchemas = zod.object({
  portfolio: zod
    .string()
    .optional()
    .refine((value) => !value || zod.string().url().safeParse(value).success, {
      message: "Please enter a valid URL for the portfolio.",
    }),
  linkedin: zod
    .string()
    .optional()
    .refine((value) => !value || zod.string().url().safeParse(value).success, {
      message: "Please enter a valid URL for LinkedIn.",
    }),
  github: zod
    .string()
    .optional()
    .refine((value) => !value || zod.string().url().safeParse(value).success, {
      message: "Please enter a valid URL for GitHub.",
    }),
});

export const EditableEducationsSchemas = zod.object({
  institution: zod.string().min(3).max(300),
  fieldOfStudy: zod.string().min(3).max(30),
  degree: zod.string().min(3).max(30),
  graduationDate: zod.date(),
});

export const SeekersSkillsSchemas = zod.object({
  skills: zod.array(zod.string()),
});

export const JobAlertsSchemas = zod.object({
  title: zod.string().min(3).max(30),
  type: zod.string().min(3).max(30),
  level: zod.string().min(3).max(30),
});
