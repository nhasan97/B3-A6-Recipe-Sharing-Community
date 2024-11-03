import mongoose from 'mongoose';
import { z } from 'zod';

const postRatingValidationSchema = z.object({
  body: z.object({
    user: z
      .string({
        required_error: 'User is required',
      })
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      }),
    recipe: z
      .string({
        required_error: 'Recipe is required',
      })
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      }),
    rating: z.number({
      required_error: 'Rating is required',
    }),
  }),
});

// const updateCommentValidationSchema = z.object({
//   body: z.object({
//     user: z
//       .string()
//       .refine((val) => {
//         return mongoose.Types.ObjectId.isValid(val);
//       })
//       .optional(),
//     recipe: z
//       .string()
//       .refine((val) => {
//         return mongoose.Types.ObjectId.isValid(val);
//       })
//       .optional(),
//     comment: z.string().optional(),
//   }),
// });

export const RatingValidation = {
  postRatingValidationSchema,
  // updateCommentValidationSchema,
};
