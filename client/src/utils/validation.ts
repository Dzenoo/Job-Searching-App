import zod from "zod";

export const SeekerRegistrationSchemas = zod.object({
  first_name: zod
    .string()
    .min(3)
    .max(30)
    .regex(
      /^[A-Z][a-zA-Z\s]*$/,
      "First name must start with an uppercase letter"
    ),
  last_name: zod
    .string()
    .min(3)
    .max(30)
    .regex(
      /^[A-Z][a-zA-Z\s]*$/,
      "Last name must start with an uppercase letter"
    ),
  email: zod.string().min(3).max(255).email(),
  password: zod
    .string()
    .min(3)
    .max(30)
    .regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,30}$/,
      "Password must contain symbols and numbers"
    ),
});

export const EmployersRegistrationSchemas = zod.object({
  number: zod.string().min(3).max(30),
  name: zod
    .string()
    .min(3)
    .max(30)
    .regex(
      /^[A-Z][a-zA-Z\s]*$/,
      "First name must start with an uppercase letter"
    ),
  industry: zod.string().min(3).max(30),
  size: zod.enum([
    "",
    "Less-than-17",
    "20-50",
    "50-100",
    "100-250",
    "250-500",
    "500-1000",
  ]),
  address: zod.string().min(3).max(30),
  email: zod.string().min(3).max(255).email(),
  password: zod
    .string()
    .min(3)
    .max(30)
    .regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,30}$/,
      "Password must contain symbols and numbers"
    ),
});

export const LoginSchemasForm = zod.object({
  email: zod.string().min(3).max(255).email(),
  password: zod
    .string()
    .min(3)
    .max(30)
    .regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,30}$/,
      "Password must contain symbols and numbers"
    ),
});

export const ApplyToJobSchemas = zod.object({
  coverLetter: zod.string().optional(),
});

export const ReviewEmployersSchemas = zod.object({
  job_position: zod.string().min(3).max(30),
  type: zod.enum(["Freelance", "Part-Time", "Full-Time", "Internship"]),
  time: zod.enum(["Less than 1", "1-2", "2-4", "4-7", "7-10", "10 or greater"]),
  negativeReview: zod.string().min(3).max(300),
  positiveReview: zod.string().min(3).max(300),
  technologies: zod
    .array(zod.string())
    .min(1, "At least one technology is required")
    .nonempty("Technologies cannot be empty"),
});
