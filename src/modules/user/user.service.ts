import AppError from '../../error/AppError';
import { TUserBody } from './user.interface';
import { User } from './user.model';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import config from '../../config';

const createUser = async (payload: TUserBody) => {
   const pass = await bcrypt.hash(
    payload?.password,
    Number(config.bcrypt_salt_round),
  );
  const userPayload = { ...payload, role: 'user', password:pass };

  const result = await User.create(userPayload);
  return result;
};




const blockUser = async (id: string) => {
  const isUSerExist = await User.findById(id);

  if (!isUSerExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this user does not exist');
  }
  if (isUSerExist.isBlocked === true) {
    throw new AppError(StatusCodes.CONFLICT, 'this user is already blocked');
  }

   await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );
  return null;
};

export const userService = {
  createUser,
  blockUser,
  
};
