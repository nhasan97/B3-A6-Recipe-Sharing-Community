import { ObjectId } from 'mongoose';

export type TPayment = {
  user: ObjectId;
  payableAmount: number;
  transactionID: string;
  isDeleted?: boolean;
};

export type TPaymentParams = {
  transactionID: string;
  payableAmount: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
};
