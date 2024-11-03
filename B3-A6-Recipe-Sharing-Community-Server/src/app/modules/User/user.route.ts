import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

export const UserRoutes = router;

router.post(
  '/create-user',
  auth(USER_ROLE.ADMIN),
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.userRegister
);

router.get('/', UserControllers.getAllUsers);

router.get('/admins', UserControllers.getAllAdmins);

router.get(
  '/without/blocked/:email',
  UserControllers.getAllUsersWithoutBlocked
);

router.get('/:id', UserControllers.getSingleUser);

router.get('/count/all-users', UserControllers.getUsersCount);

router.patch('/:id', auth(USER_ROLE.ADMIN), UserControllers.updateUserStatus);

router.patch(
  '/become-pro/:id',
  auth(USER_ROLE.USER),
  UserControllers.updateUserType
);

router.patch(
  '/follow-unfollow/user',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  UserControllers.followUnfollowMember
);
