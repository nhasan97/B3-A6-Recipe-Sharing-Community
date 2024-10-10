import { TImageFiles } from '../../interfaces/image.interface';
// import { addDocumentToIndex } from '../../utils/meilisearch';
import { TRecipe } from './recipe.interface';
import { Recipe } from './recipe.model';

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

const getAllRecipesFromDB = async (query: Record<string, unknown>) => {
  const queryObject = { ...query };

  const searchableFields = ['title'];
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
  const filterQuery = searchQuery.find();

  let sort = 'title';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let limit = 10;
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
  const queryObject = { ...query };

  const searchableFields = ['title'];
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
  const filterQuery = searchQuery.find({ user: id });

  let sort = 'title';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let limit = 10;
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

const getRecipeCountFromDB = async () => {
  const response = await Recipe.countDocuments({
    isDeleted: { $ne: true },
  });
  return response;
};

export const RecipeServices = {
  createRecipeIntoDB,
  getAllRecipesFromDB,
  getRecipesByUserFromDB,
  getRecipeCountFromDB,
  getSingleRecipeFromDB,
};
