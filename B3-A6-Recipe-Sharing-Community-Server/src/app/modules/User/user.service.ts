/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import {
  USER_ROLE,
  USER_STATUS,
  USER_TYPE,
  UserSearchableFields,
} from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';
import { initiatePayment } from '../Payment/payment.utils';
import { Payment } from '../Payment/payment.model';
import { TPaymentParams } from '../Payment/payment.interface';
import mongoose from 'mongoose';

const createUser = async (payload: TUser) => {
  const user = await User.create(payload);

  return user;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(
    User.find({ role: { $ne: USER_ROLE.ADMIN }, isDeleted: { $ne: true } }),
    query
  )
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getAllUsersFromDBWithoutBlocked = async (
  query: Record<string, unknown>,
  email: string | undefined
) => {
  let getActiveUsersQuery = {};

  if (email) {
    getActiveUsersQuery = {
      role: { $ne: USER_ROLE.ADMIN },
      status: { $ne: USER_STATUS.BLOCKED },
      email: { $ne: email },
      isDeleted: { $ne: true },
    };
  } else {
    getActiveUsersQuery = {
      role: { $ne: USER_ROLE.ADMIN },
      status: { $ne: USER_STATUS.BLOCKED },
      isDeleted: { $ne: true },
    };
  }

  const users = new QueryBuilder(User.find(getActiveUsersQuery), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(
    User.find({ role: { $eq: USER_ROLE.ADMIN }, isDeleted: { $ne: true } }),
    query
  )
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findOne({ _id: id, isDeleted: { $ne: true } });

  return user;
};

const updateUserStatus = async (id: string, status: string) => {
  // const user = await User.findById(id);
  const query = { _id: id };
  const option = { upsert: false };
  const updatedDoc = {
    $set: { status },
  };

  const result = await User.updateOne(query, updatedDoc, option);

  return result;
};

const updateUserType = async (id: string) => {
  const query = { _id: id, status: USER_STATUS.ACTIVE };

  const user = await User.findOne(query);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exixts!');
  }

  const option = { upsert: false };

  const updatedDoc = {
    $set: { userType: USER_TYPE.PRO },
  };

  const paymentData = {
    user: user?._id,
    payableAmount: 14,
    transactionID: `Txn-${
      Date.now() + '-' + Math.floor(Math.random() * 100000 + 1)
    }`,
  };

  //payment process
  const paymentParams = {
    transactionID: paymentData.transactionID,
    payableAmount: paymentData.payableAmount,
    name: user?.name,
    email: user?.email,
    phone: user?.mobileNumber,
  };
  const paymentSession = await initiatePayment(paymentParams as TPaymentParams);

  //returning result of create operation
  if (paymentSession?.result === 'true') {
    await Payment.create(paymentData);
    await User.updateOne(query, updatedDoc, option);
  }
  return paymentSession;
};

const updateFollowUnfollowMemberInDB = async (
  memberId: string,
  loggedInUserId: string,
  followStatus: string
) => {
  const userToBeFollowed = await User.findById(memberId);
  const userWhoWantsToFollow = await User.findById(loggedInUserId);

  if (!userToBeFollowed || !userWhoWantsToFollow) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  //--------------------------------------------------------------------------------

  const session = await mongoose.startSession();

  if (followStatus === 'follow') {
    try {
      // Start the transaction
      session.startTransaction();

      //update following for logged in user (transaction-1)
      const updatedDoc1 = {
        $set: { following: [...userWhoWantsToFollow.following, memberId] },
      };

      const result1 = await User.updateOne(
        { _id: loggedInUserId },
        updatedDoc1,
        { session }
      );
      if (result1.modifiedCount === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Could not update!');
      }

      //update follower for member (transaction-2)
      const updatedDoc2 = {
        $set: { followers: [...userToBeFollowed.followers, loggedInUserId] },
      };

      const result2 = await User.updateOne({ _id: memberId }, updatedDoc2, {
        session,
      });
      if (result2.modifiedCount === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Could not update!');
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
  }

  if (followStatus === 'unfollow') {
    try {
      // Start the transaction
      session.startTransaction();

      //update following for logged in user (transaction-1)
      const updatedDoc1 = {
        $set: {
          following: [
            ...userWhoWantsToFollow.following.filter(
              (id) => id.toString() !== memberId
            ),
          ],
        },
      };

      const result1 = await User.updateOne(
        { _id: loggedInUserId },
        updatedDoc1,
        { session }
      );
      if (result1.modifiedCount === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Could not update!');
      }

      //update follower for member (transaction-2)
      const updatedDoc2 = {
        $set: {
          followers: [
            ...userToBeFollowed.followers.filter(
              (id) => id.toString() !== loggedInUserId
            ),
          ],
        },
      };

      const result2 = await User.updateOne({ _id: memberId }, updatedDoc2, {
        session,
      });
      if (result2.modifiedCount === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Could not update!');
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
  }
};

const getUserCountFromDB = async () => {
  const response = await User.aggregate([
    {
      $match: {
        status: { $eq: USER_STATUS.ACTIVE },
        isDeleted: { $ne: true },
      },
    },
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        users: {
          $cond: [{ $eq: ['$_id', 'USER'] }, '$count', 0],
        },
        admins: {
          $cond: [{ $eq: ['$_id', 'ADMIN'] }, '$count', 0],
        },
      },
    },
    {
      $group: {
        _id: null,
        users: { $sum: '$users' },
        admins: { $sum: '$admins' },
      },
    },
    {
      $project: {
        _id: 0,
        users: 1,
        admins: 1,
      },
    },
  ]);

  return response.length > 0 ? response[0] : { users: 0, admins: 0 };
};

const deleteUserFromDB = async (id: string) => {
  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exixts!');
  }

  const response = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  return response;
};

export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  getAllAdminsFromDB,
  getAllUsersFromDBWithoutBlocked,
  updateUserStatus,
  updateUserType,
  updateFollowUnfollowMemberInDB,
  getUserCountFromDB,
  deleteUserFromDB,
};
