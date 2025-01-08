/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { userService } from './user.service';
import sendResponse from '../../utills/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utills/catchAsync';

// here user is created with the role 'user'
const createUser = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await userService.createUser(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});



// only admin can block a user
const blockUser = catchAsync(async (req, res, next) => {
  const id = req.params.userId;
  console.log(id)
  const result = await userService.blockUser(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User blocked successfully',
    data: result,
  });
});

export const userController = {
  createUser,
  blockUser,
};
