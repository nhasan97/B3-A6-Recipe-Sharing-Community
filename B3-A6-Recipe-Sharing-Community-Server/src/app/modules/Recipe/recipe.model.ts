import { Schema, model } from 'mongoose';
import { RecipeModel, TRecipe } from './recipe.interface';
import { CONTENT_TYPE, RECIPE_STATUS } from './recipe.constant';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const recipeSchema = new Schema<TRecipe, RecipeModel>(
  {
    title: {
      type: String,
      required: true,
    },
    instruction: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      default: [],
      required: true,
    },
    cookingTime: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      enum: Object.keys(CONTENT_TYPE),
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    upVote: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    downVote: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: Object.keys(RECIPE_STATUS),
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

//using document middleware for checking if the document already exists or not
recipeSchema.pre('save', async function (next) {
  const doesExist = await Recipe.findOne({
    title: this.title,
    instruction: this.instruction,
    images: this.images,
    category: this.category,
    ingredients: this.ingredients,
    tags: this.tags,
    status: this.status,
    user: this.user,
  });
  if (doesExist) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Recipe already exists'
    );
  }
  next();
});

//using query middleware for fetching documents not having isDeleted property as true
// recipeSchema.pre('find', async function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

//using query middleware for fetching single document not having isDeleted property as true
// recipeSchema.pre('findOne', async function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

//checking if the facility exists or not using static method
recipeSchema.statics.doesRecipeExist = async function (id: string) {
  return await Recipe.findById(id);
};

export const Recipe = model<TRecipe, RecipeModel>('Recipe', recipeSchema);
