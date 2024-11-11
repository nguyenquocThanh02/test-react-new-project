import { z } from "zod";

export const emailValidator = () =>
  z
    .string()
    .trim()
    .min(1, {
      message: "Email is required.",
    })
    .email({
      message: "Format email is invalid",
    });
export const passwordValidator = () =>
  z
    .string()
    .trim()
    .min(8, {
      message: "Password has at least 8 characters.",
    })
    .regex(/^(?=.*[a-z])/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least one digit.",
    })
    .regex(/^(?=.*[@$!%*?&])/, {
      message:
        "Password must contain at least one special character (@$!%*?&).",
    });
export const requiredString = (fieldName: string) =>
  z
    .string()
    .trim()
    .min(1, {
      message: `${fieldName} is required.`,
    });
