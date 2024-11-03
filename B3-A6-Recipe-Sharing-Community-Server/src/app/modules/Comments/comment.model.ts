import { model, Schema } from 'mongoose';
import { ICommentModel, TComment } from './comment.interface';

const commentSchema = new Schema<TComment, ICommentModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    recipe: {
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true,
    },

    comment: {
      type: String,
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

//using query middleware for fetching documents not having isDeleted property as true
// commentSchema.pre('find', async function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

//using query middleware for fetching single document not having isDeleted property as true
// commentSchema.pre('findOne', async function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

commentSchema.statics.doesCommentExist = async function (id: string) {
  return await Comment.findById(id);
};

export const Comment = model<TComment, ICommentModel>('Comment', commentSchema);
