import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const userRegister = catchAsync(async (req, res) => {
  const user = await UserServices.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment Created Successfully',
    data: user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users Retrieved Successfully',
    data: users,
  });
});

const getAllUsersWithoutBlocked = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDBWithoutBlocked(
    req.query,
    req.params.email
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users Retrieved Successfully',
    data: users,
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const users = await UserServices.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users Retrieved Successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Retrieved Successfully',
    data: user,
  });
});

const getUsersCount = catchAsync(async (req, res) => {
  const response = await UserServices.getUserCountFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe fetched successfully',
    data: response,
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  const user = await UserServices.updateUserStatus(
    req?.params?.id,
    req?.query?.status as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Retrieved Successfully',
    data: user,
  });
});

const updateUserType = catchAsync(async (req, res) => {
  const user = await UserServices.updateUserType(req?.params?.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User type updated Successfully',
    data: user,
  });
});

const followUnfollowMember = catchAsync(async (req, res) => {
  const user = await UserServices.updateFollowUnfollowMemberInDB(
    req?.query?.memberId as string,
    req?.query?.loggedInUserId as string,
    req?.query?.followStatus as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User type updated Successfully',
    data: user,
  });
});

export const UserControllers = {
  getSingleUser,
  userRegister,
  getAllUsers,
  getAllAdmins,
  updateUserStatus,
  getAllUsersWithoutBlocked,
  updateUserType,
  followUnfollowMember,
  getUsersCount,
};
