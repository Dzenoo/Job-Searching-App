import zod from "zod";

export const ApplyToJobSchemas = zod.object({
  coverLetter: zod.string().optional(),
});

export const NewJobSchemas = zod.object({
  title: zod
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(30, "Title must not exceed 30 characters")
    .trim(),
  position: zod.enum(["Remote", "On-Site", "Hybrid"]),
  location: zod
    .string()
    .min(3, "Location must be at least 3 characters long")
    .max(30, "Location must not exceed 30 characters")
    .trim(),
  overview: zod
    .string()
    .min(30, "Overview must be at least 30 characters long")
    .max(300, "Overview must not exceed 300 characters")
    .trim(),
  type: zod.enum(["Internship", "Full-Time", "Part-Time", "Freelance"]),
  skills: zod.array(
    zod
      .string()
      .min(1, "Skills must be at least 1 character long")
      .max(16, "Skills must not exceed 16 characters")
      .trim()
  ),
  level: zod.enum(["Junior", "Medior", "Senior", "Lead"]),
  salary: zod
    .number()
    .min(30000, "Salary must be at least $30,000")
    .nonnegative(),
  expiration_date: zod
    .string()
    .refine(
      (val) => zod.date().safeParse(new Date(val)).success,
      "Expiration date must be a valid date"
    ),
  description: zod
    .string()
    .min(30, "Description must be at least 30 characters long")
    .max(600, "Description must not exceed 600 characters"),
});
