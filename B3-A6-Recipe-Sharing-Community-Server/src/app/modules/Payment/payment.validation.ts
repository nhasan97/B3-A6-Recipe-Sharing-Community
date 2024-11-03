import mongoose from 'mongoose';
import { z } from 'zod';

const paymentValidationSchema = z.object({
  body: z.object({
    user: z
      .string({
        required_error: 'User is required',
      })
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      }),
    payableAmount: z.number({
      required_error: 'payableAmount is required',
    }),
    transactionID: z.string({
      required_error: 'TransactionID is required',
    }),
  }),
});

export const PaymentValidation = {
  paymentValidationSchema,
};
