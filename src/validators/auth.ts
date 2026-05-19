import { z } from "zod";

export const signupSchema = z.object({
  organizationName: z
    .string()
    .min(2, "Organization name is required"),

  email: z
    .string()
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});