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
  size: zod.string().min(3).max(30),
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
