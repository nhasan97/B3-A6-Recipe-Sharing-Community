import { model, Schema } from 'mongoose';
import { TPayment } from './payment.interface';

const paymentSchema = new Schema<TPayment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    payableAmount: {
      type: Number,
      required: true,
    },

    transactionID: {
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

paymentSchema.statics.doesRatingExist = async function (id: string) {
  return await Payment.findById(id);
};
export const Payment = model<TPayment>('Payment', paymentSchema);
