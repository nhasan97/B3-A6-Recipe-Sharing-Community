import mongoose from 'mongoose';
import { z } from 'zod';
import { CONTENT_TYPE, RECIPE_STATUS } from './recipe.constant';

const createRecipeValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    instruction: z.string({
      required_error: 'Instruction is required',
    }),
    ingredients: z.string().array(),
    cookingTime: z.string({
      required_error: 'Cooking time is required',
    }),
    image: z.string().optional(),
    contentType: z.nativeEnum(CONTENT_TYPE).default(CONTENT_TYPE.Open),
    rating: z
      .number({
        required_error: 'Rating is required',
      })
      .default(0),
    category: z.string({
      required_error: 'Category is required',
    }),
    upVote: z
      .string()
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      })
      .array(),
    downVote: z
      .string()
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      })
      .array(),
    tags: z.string().optional().array(),
    status: z.nativeEnum(RECIPE_STATUS).default(RECIPE_STATUS.PUBLISHED),
    user: z
      .string({
        required_error: 'User is required',
      })
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      }),
  }),
});

const updateRecipeValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instruction: z.string().optional(),
    ingredients: z.string().array().optional(),
    cookingTime: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    contentType: z.nativeEnum(CONTENT_TYPE).optional(),
    rating: z.number().optional(),
    upVote: z
      .string()
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      })
      .array()
      .optional(),
    downVote: z
      .string()
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      })
      .array()
      .optional(),
    tags: z.string().optional().array(),
    status: z.nativeEnum(RECIPE_STATUS).optional(),
    user: z
      .string()
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      })
      .optional(),
  }),
});

export const RecipeValidation = {
  createRecipeValidationSchema,
  updateRecipeValidationSchema,
};
