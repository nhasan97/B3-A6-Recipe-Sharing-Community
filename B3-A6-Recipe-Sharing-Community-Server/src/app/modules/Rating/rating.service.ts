/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TRating } from './rating.interface';
import { Rating } from './rating.model';
import { Recipe } from '../Recipe/recipe.model';
import mongoose from 'mongoose';

const postRatingIntoDB = async (payload: TRating) => {
  const query = { _id: payload?.recipe };

  const recipe = await Recipe.findOne(query);

  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe does not exixts!');
  }

  const session = await mongoose.startSession();

  try {
    // Start the transaction
    session.startTransaction();

    //Create a new rating (transaction-1)
    const result1 = await Rating.create([payload], { session });

    if (!result1.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not post rating!');
    }

    //Retrieve all ratings for the recipe (including the newly added one)
    const result2 = await Rating.find({ recipe: payload?.recipe }).session(
      session
    );

    // Calculate the average rating
    let avgRating = 0;
    if (result2.length > 0) {
      const totalRating = result2.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );
      avgRating = totalRating / result2.length;
    } else {
      avgRating = 0;
    }

    //Update the recipe's average rating (transaction-2)
    const updatedDoc = {
      $set: { rating: avgRating },
    };

    const result3 = await Recipe.updateOne(query, updatedDoc, { session });

    if (result3.modifiedCount === 0) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not update rating!');
    }

    // Commit the transaction if everything is successful
    await session.commitTransaction();
    await session.endSession();

    return result1;
  } catch (err: any) {
    // Rollback the transaction in case of an error
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getRecipeRatingFromDB = async (
  recipeId: string,
  userId: string | undefined
) => {
  const result1 = await Rating.findOne({ recipe: recipeId, user: userId });
  const result2 = await Rating.find({ recipe: recipeId });

  let finalResult = {};
  if (result1) {
    finalResult = {
      userAlreadyRated: 1,
      numberOfRecipeRatings: result2?.length,
    };
  } else {
    finalResult = {
      userAlreadyRated: 0,
      numberOfRecipeRatings: result2?.length,
    };
  }
  return finalResult;
};

export const RatingServices = {
  postRatingIntoDB,
  getRecipeRatingFromDB,
};
