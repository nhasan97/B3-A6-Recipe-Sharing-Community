import { ObjectId } from 'mongoose';

export type TRating = {
  user: ObjectId;
  recipe: ObjectId;
  rating: number;
  isDeleted?: boolean;
};
