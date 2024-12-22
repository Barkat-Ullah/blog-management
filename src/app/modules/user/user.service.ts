import config from '../../config';
import AppError from '../../error/AppError';
import { ILoginUser, IRegisterUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUserIntoDB = async (payload: IRegisterUser) => {
  const { email, password } = payload;
  const isRegisterUserExists = await User.findOne({ email });
  if (isRegisterUserExists) {
    throw new AppError(401, 'This user is already exists');
  }

  payload.password = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );
  const result = await User.create(payload);
  return result;
};

const loginUserIntoDB = async (payload: ILoginUser) => {
  const { email } = payload;
  const isUserExists = await User.findOne({ email });
  if (!isUserExists) {
    throw new AppError(401, 'This user is not found');
  }

  const { _id, role, isBlocked } = isUserExists;

  if (isBlocked) {
    throw new AppError(401, 'This user is Blocked');
  }
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(401, 'Password is invalid');
  }

  const user = {
    id: _id,
    role,
    email: isUserExists?.email,
  };
  const accessToken = jwt.sign(user, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in as string,
  });
  return {
    accessToken,
  };
};

export const UserServices = {
  registerUserIntoDB,
  loginUserIntoDB,
};
