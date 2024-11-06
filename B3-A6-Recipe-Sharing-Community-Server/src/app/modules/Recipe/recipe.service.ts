/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TImageFiles } from '../../interfaces/image.interface';
import { TRecipe, TRecipeUpdate } from './recipe.interface';
import { Recipe } from './recipe.model';
import { USER_ROLE, USER_STATUS, USER_TYPE } from '../User/user.constant';
import { User } from '../User/user.model';
import mongoose from 'mongoose';

const createRecipeIntoDB = async (payload: TRecipe, images: TImageFiles) => {
  const { itemImages } = images;
  payload.images = itemImages.map((image) => image.path);

  const result = await Recipe.create(payload);

  // const { _id, title, description, images: itemThumbnails } = result;

  // await meiliClient.index('item').addDocuments([
  //   {
  //     _id: _id.toString(),
  //     title,
  //     description,
  //     images: itemThumbnails?.[0] || '',
  //   },
  // ]);
  //   await addDocumentToIndex(result, 'recipes');
  return result;
};

const getAllRecipesFromDB = async (
  query: Record<string, unknown>,
  loggedInUserEmail?: string | undefined
) => {
  let user;

  if (loggedInUserEmail) {
    user = await User.findOne({
      email: loggedInUserEmail,
      status: USER_STATUS.ACTIVE,
    });
  }

  const queryObject = { ...query };

  const searchableFields = ['title', 'ingredients', 'cookingTime', 'tags'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery = Recipe.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const excludeFields = ['searchTerm', 'sort', 'limit', 'page'];

  excludeFields.forEach((el) => delete queryObject[el]);

  let getRecipeQuery = {};

  if (loggedInUserEmail && user) {
    if (user?.role === USER_ROLE.ADMIN) {
      getRecipeQuery = {
        isDeleted: { $ne: true },
        ...queryObject,
      };
    } else if (user?.userType === USER_TYPE.PRO) {
      getRecipeQuery = {
        status: { $eq: 'PUBLISHED' },
        isDeleted: { $ne: true },
        ...queryObject,
      };
    } else {
      getRecipeQuery = {
        // contentType: { $eq: CONTENT_TYPE.Open },
        isDeleted: { $ne: true },
        status: { $eq: 'PUBLISHED' },
        ...queryObject,
      };
    }
  } else {
    getRecipeQuery = {
      // contentType: { $eq: CONTENT_TYPE.Open },
      isDeleted: { $ne: true },
      status: { $eq: 'PUBLISHED' },
      ...queryObject,
    };
  }

  const filterQuery = searchQuery.find(getRecipeQuery).populate('user');

  let sort = 'title';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  let page = 1;
  let skip = 0;
  if (query?.limit) {
    limit = Number(query?.limit);
  }
  if (query?.page) {
    page = Number(query?.page);
    skip = page * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = await paginateQuery.limit(limit);

  return limitQuery;
};

const getRecipesByUserFromDB = async (
  query: Record<string, unknown>,
  id: string
) => {
  const member = await User.findById(id);
  if (!member) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  let loggedInUser;
  if (query?.loggedInUserEmail) {
    loggedInUser = await User.findOne({
      email: query?.loggedInUserEmail,
      status: USER_STATUS.ACTIVE,
    });
  }

  const queryObject = { ...query };

  const searchableFields = ['title', 'ingredients', 'cookingTime', 'tags'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery = Recipe.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const excludeFields = [
    'searchTerm',
    'sort',
    'limit',
    'page',
    'loggedInUserEmail',
  ];

  excludeFields.forEach((el) => delete queryObject[el]);

  let getRecipeQuery = {};

  if (query?.loggedInUserEmail && loggedInUser) {
    if (
      loggedInUser?.role === USER_ROLE.ADMIN ||
      loggedInUser?._id.toString() === id
    ) {
      getRecipeQuery = {
        user: id,
        isDeleted: { $ne: true },
        ...queryObject,
      };
    } else {
      getRecipeQuery = {
        user: id,
        isDeleted: { $ne: true },
        status: { $eq: 'PUBLISHED' },
        ...queryObject,
      };
    }
  } else {
    getRecipeQuery = {
      user: id,
      isDeleted: { $ne: true },
      status: { $eq: 'PUBLISHED' },
      ...queryObject,
    };
  }

  const filterQuery = searchQuery.find(getRecipeQuery).populate('user');

  let sort = 'title';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  let page = 1;
  let skip = 0;
  if (query?.limit) {
    limit = Number(query?.limit);
  }
  if (query?.page) {
    page = Number(query?.page);
    skip = page * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = await paginateQuery.limit(limit);

  return limitQuery;
};

const getSingleRecipeFromDB = async (recipeId: string) => {
  const result = await Recipe.findById(recipeId).populate('user');

  return result;
};

const getRecipeCountFromDB = async (loggedInUserEmail: string | undefined) => {
  let user;

  if (loggedInUserEmail) {
    user = await User.findOne({
      email: loggedInUserEmail,
      status: USER_STATUS.ACTIVE,
    });
  }

  let getRecipeQuery = {};

  if (loggedInUserEmail && user) {
    if (user?.role === USER_ROLE.ADMIN) {
      getRecipeQuery = { isDeleted: { $ne: true } };
    } else {
      getRecipeQuery = {
        isDeleted: { $ne: true },
        status: { $eq: 'PUBLISHED' },
      };
    }
  } else {
    getRecipeQuery = {
      isDeleted: { $ne: true },
      status: { $eq: 'PUBLISHED' },
    };
  }

  const response = await Recipe.countDocuments(getRecipeQuery);
  return response;
};

const getUsersRecipeCountFromDB = async (userId: string) => {
  const user = await User.findOne({
    _id: userId,
    status: USER_STATUS.ACTIVE,
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const response = await Recipe.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        isDeleted: { $ne: true },
      },
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        publishedRecipes: {
          $cond: [{ $eq: ['$_id', 'PUBLISHED'] }, '$count', 0],
        },
        unPublishedRecipes: {
          $cond: [{ $eq: ['$_id', 'UNPUBLISHED'] }, '$count', 0],
        },
      },
    },
    {
      $group: {
        _id: null,
        publishedRecipes: { $sum: '$publishedRecipes' },
        unPublishedRecipes: { $sum: '$unPublishedRecipes' },
      },
    },
    {
      $project: {
        _id: 0,
        publishedRecipes: 1,
        unPublishedRecipes: 1,
      },
    },
  ]);

  return response.length > 0
    ? response[0]
    : { publishedRecipes: 0, unPublishedRecipes: 0 };
};

const updateRecipeStatusIntoDB = async (id: string, status: string) => {
  const query = { _id: id };
  const option = { upsert: false };
  const updatedDoc = {
    $set: { status },
  };

  const result = await Recipe.updateOne(query, updatedDoc, option);

  return result;
};

const updateRecipeIntoDB = async (
  recipeId: string,
  data: Partial<TRecipeUpdate>,
  images: TImageFiles
) => {
  const filter = {
    _id: recipeId,
  };

  const recipe = await Recipe.findOne(filter);

  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe does not exixts!');
  }

  if (images) {
    const { itemImages } = images;
    data.images = [
      ...(recipe.images as string[]),
      ...itemImages.map((image) => image.path),
    ];
  } else {
    // delete data.images;
    data.images = [...(recipe.images as string[])];
  }

  return await Recipe.findOneAndUpdate(filter, data, { new: true });
};

const deleteRecipeFromDB = async (id: string) => {
  const recipe = await Recipe.doesRecipeExist(id);
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found');
  }

  const response = await Recipe.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  return response;
};

const likeUnlikeRecipeIntoDB = async (
  recipeId: string,
  loggedInUserId: string,
  likeStatus: string
) => {
  const query = { _id: recipeId };
  const recipe = await Recipe.findOne(query);

  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe does not exixts!');
  }

  //--------------------------------------------------------------------------------

  let updatedUpVote = [];
  let updatedDownVote = [];
  let updatedDoc = {};

  //--------------------------------------------------------------------------------

  if (likeStatus === 'like') {
    try {
      updatedUpVote = [...recipe.upVote, loggedInUserId];

      const isUserInDislike = recipe.downVote.find(
        (user) => user.toString() === loggedInUserId
      );

      if (isUserInDislike) {
        updatedDownVote = [
          ...recipe.downVote.filter(
            (user) => user.toString() !== loggedInUserId
          ),
        ];
        updatedDoc = {
          $set: { upVote: updatedUpVote, downVote: updatedDownVote },
        };
      } else {
        updatedDoc = {
          $set: { upVote: updatedUpVote },
        };
      }

      const result = await Recipe.updateOne(query, updatedDoc);
      return result;
    } catch (error: any) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Something went wrong! ${error}`
      );
    }
  }

  //--------------------------------------------------------------------------------

  if (likeStatus === 'unlike') {
    try {
      updatedUpVote = [
        ...recipe.upVote.filter((user) => user.toString() !== loggedInUserId),
      ];
      updatedDoc = {
        $set: { upVote: updatedUpVote },
      };

      const result = await Recipe.updateOne(query, updatedDoc);
      return result;
    } catch (error: any) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Something went wrong! ${error}`
      );
    }
  }
};

const dislikeUndislikeRecipeIntoDB = async (
  recipeId: string,
  loggedInUserId: string,
  dislikeStatus: string
) => {
  const query = { _id: recipeId };
  const recipe = await Recipe.findOne(query);

  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe does not exixts!');
  }

  //--------------------------------------------------------------------------------

  let updatedDownVote = [];
  let updatedUpVote = [];
  let updatedDoc = {};

  //--------------------------------------------------------------------------------

  if (dislikeStatus === 'dislike') {
    try {
      updatedDownVote = [...recipe.downVote, loggedInUserId];

      const isUserInLike = recipe.upVote.find(
        (user) => user.toString() === loggedInUserId
      );

      if (isUserInLike) {
        updatedUpVote = [
          ...recipe.upVote.filter((user) => user.toString() !== loggedInUserId),
        ];
        updatedDoc = {
          $set: { upVote: updatedUpVote, downVote: updatedDownVote },
        };
      } else {
        updatedDoc = {
          $set: { downVote: updatedDownVote },
        };
      }

      const result = await Recipe.updateOne(query, updatedDoc);
      return result;
    } catch (error: any) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Something went wrong! ${error}`
      );
    }
  }

  //--------------------------------------------------------------------------------

  if (dislikeStatus === 'undislike') {
    try {
      updatedDownVote = [
        ...recipe.downVote.filter((user) => user.toString() !== loggedInUserId),
      ];
      updatedDoc = {
        $set: { downVote: updatedDownVote },
      };

      const result = await Recipe.updateOne(query, updatedDoc);
      return result;
    } catch (error: any) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Something went wrong! ${error}`
      );
    }
  }
};

export const RecipeServices = {
  createRecipeIntoDB,
  getAllRecipesFromDB,
  getRecipesByUserFromDB,
  getRecipeCountFromDB,
  getUsersRecipeCountFromDB,
  getSingleRecipeFromDB,
  updateRecipeStatusIntoDB,
  updateRecipeIntoDB,
  deleteRecipeFromDB,
  likeUnlikeRecipeIntoDB,
  dislikeUndislikeRecipeIntoDB,
};
