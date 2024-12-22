import AppError from '../../error/AppError';
import { Blog } from '../blog/blog.model';
import { User } from '../user/user.model';

const blockUserFromDB = async (userId: string) => {
  const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(403, 'User not found');
  }
  const result = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );
  return result;
};
const deleteBlogFromDB = async (id: string) => {
  const isBlogExists = await Blog.findById(id);
  if (!isBlogExists) {
    throw new AppError(404, 'Blog not found');
  }
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const AdminServices = {
  blockUserFromDB,
  deleteBlogFromDB,
};
