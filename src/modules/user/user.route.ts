import { Router } from 'express';
import { userController } from './user.controller';
import { userValidation } from './user.validation';
import validateRequest from '../../middlewire/validateRequest';
import auth from '../../middlewire/auth';
import { USER_ROLE } from './user.constant';

const router = Router();

// user creation route with the role 'user
router.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
  userController.createUser,
);


// the route where admin can block a user
router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  userController.blockUser,
);

export const userRouter = router;
