import zod from "zod";

export const MessageSchema = zod.object({
  content: zod
    .string()
    .min(1, { message: "First Name must be at least 1 characters long" })
    .max(300, { message: "First Name must be at most 300 characters long" }),
});
