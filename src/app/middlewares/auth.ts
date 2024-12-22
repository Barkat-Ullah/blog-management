import { JwtPayload } from 'jsonwebtoken';
import AppError from '../error/AppError';
import { User } from '../modules/user/user.model';
import jwt from 'jsonwebtoken';
import config from '../config';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (!token) {
      throw new AppError(401, 'Unauthorized');
    }
    //verify token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, email } = decoded;
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError(401, 'Invalid token or user not found'));
    }

    const isUserExists = await User.findOne({ email });
    if (!isUserExists) {
      throw new AppError(401, 'This user is not found');
    }

    const { isBlocked } = isUserExists;

    if (isBlocked) {
      throw new AppError(401, 'This user is Blocked');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized !');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
