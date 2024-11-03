import { model, Schema } from 'mongoose';
import { TRating } from './rating.interface';

const ratingSchema = new Schema<TRating>(
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

    rating: {
      type: Number,
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

ratingSchema.statics.doesRatingExist = async function (id: string) {
  return await Rating.findById(id);
};
export const Rating = model<TRating>('Rating', ratingSchema);
