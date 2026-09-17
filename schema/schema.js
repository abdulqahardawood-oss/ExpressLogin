import { z } from "zod";

export const userSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name must not exceed 50 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name must not exceed 50 characters"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must not exceed 100 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),

  role: z.enum(["candidate", "employer"], {
    message: "Role must be either candidate or employer",
  }),
});


export const userRegistrationSchema = userSchema;

export const userParamsSchema = z.object({
  id: z.coerce
    .number()
    .int("User ID must be a whole number")
    .positive("User ID must be a positive number"),
});




export const userQuerySchema = z.object({
  role: z
    .enum(["candidate", "employer"], {
      message: "Role must be candidate or employer",
    })
    .optional(),

  search: z
    .string()
    .trim()
    .optional(),

  page: z.coerce
    .number()
    .int("Page must be a whole number")
    .positive("Page must be greater than 0")
    .default(1),

  limit: z.coerce
    .number()
    .int("Limit must be a whole number")
    .positive("Limit must be greater than 0")
    .max(100, "Limit cannot exceed 100")
    .default(10),
});