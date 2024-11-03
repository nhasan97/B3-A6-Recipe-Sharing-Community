import { z } from "zod";

const forgotPasswordValidationSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
});

export default forgotPasswordValidationSchema;
