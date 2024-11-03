/* eslint-disable no-unused-vars */
import { Model, ObjectId } from 'mongoose';

export type TComment = {
  user: ObjectId;
  recipe: ObjectId;
  comment: string;
  isDeleted?: boolean;
};

export interface ICommentModel extends Model<TComment> {
  doesCommentExist(id: string): Promise<TComment>;
}
