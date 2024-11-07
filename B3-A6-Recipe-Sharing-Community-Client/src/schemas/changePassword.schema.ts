import { z } from "zod";

const changePasswordValidationSchema = z.object({
  oldPassword: z
    .string()
    .trim()
    .min(6, "password must be atleast 6 characters long"),
  newPassword: z
    .string()
    .trim()
    .min(6, "password must be atleast 6 characters long"),
});

export default changePasswordValidationSchema;
