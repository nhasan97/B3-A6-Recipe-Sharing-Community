import { ObjectId } from 'mongoose';

export type TComment = {
  user: ObjectId;
  recipe: ObjectId;
  comment: string;
  isDeleted?: boolean;
};
