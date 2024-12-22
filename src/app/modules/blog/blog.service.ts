import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { blogFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog, userId: string) => {
  const { title, content } = payload;
  const result = await Blog.create({ title, content, author: userId });
  return result;
};

const updateBlogFromDB = async (id: string, payload: Partial<TBlog>) => {
  const isThisBlogExists = await Blog.findById(id);
  if (!isThisBlogExists) {
    throw new AppError(404, 'This blog is not found');
  }

  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteBlogIntoDb = async (id: string) => {
  const isThisBlogExists = await Blog.findById(id);
  if (!isThisBlogExists) {
    throw new AppError(404, 'This blog is not found');
  }
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const getAllBlogsIntoDB = async (query: Record<string, unknown>) => {
  const queryBlog = new QueryBuilder(
    Blog.find().populate('author', 'name email'),
    query,
  )
    .search(['title', 'content'])
    .sortBy()
    .sortOrder()
    .filter();

  const result = await queryBlog.modelQuery;

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogFromDB,
  deleteBlogIntoDb,
  getAllBlogsIntoDB,
};
