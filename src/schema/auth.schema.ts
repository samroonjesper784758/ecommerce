import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
const passwordValidation = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(passwordRegex, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
  });

export const validateSignup = z.object({
  name: z.string(),
  email: z.string().email(),
  password: passwordValidation,
});

export const validateLogin = z.object({
  email: z.string().email(),
  password: z.string(),
});
