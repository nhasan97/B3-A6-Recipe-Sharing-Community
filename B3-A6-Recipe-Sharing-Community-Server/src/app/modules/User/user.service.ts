import { QueryBuilder } from '../../builder/QueryBuilder';
import { USER_ROLE, USER_STATUS, UserSearchableFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUser) => {
  const user = await User.create(payload);

  return user;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(
    User.find({ role: { $ne: USER_ROLE.ADMIN } }),
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
  email: string
) => {
  const users = new QueryBuilder(
    User.find({
      role: { $ne: USER_ROLE.ADMIN },
      status: { $ne: USER_STATUS.BLOCKED },
      email: { $ne: email },
    }),
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

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(
    User.find({ role: { $eq: USER_ROLE.ADMIN } }),
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
  const user = await User.findById(id);

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

export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  getAllAdminsFromDB,
  getAllUsersFromDBWithoutBlocked,
  updateUserStatus,
};
