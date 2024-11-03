import { z } from "zod";

const resetPasswordValidationSchema = z.object({
  newPassword: z
    .string()
    .trim()
    .min(6, "password must be atleast 6 characters long"),
});

export default resetPasswordValidationSchema;
