import AppError from '../../error/AppError';
import catchAsync from '../../utils/catchAsync';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await BlogServices.createBlogIntoDB(req.body, userId);
  const blogPublisherDetails = await result.populate<{
    author: { name: string; email: string };
  }>('author', 'name email');
  const { _id, title, content, author } = blogPublisherDetails.toObject();
  const { name, email } = author;

  res.status(200).json({
    success: true,
    message: 'Blog created successfully',
    data: {
      _id,
      title,
      content,
      author: { name, email },
    },
  });
});
const updateBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await BlogServices.updateBlogFromDB(id, updatedData);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: 'Blog not found',
    });
  }

  const blogPublisherDetails = await result?.populate('author', 'name email');

  const { _id, title, content, author } = blogPublisherDetails.toObject();
  const { name, email } = author;

  res.status(200).json({
    success: true,
    message: 'Blog updated successfully',
    data: {
      _id,
      title,
      content,
      author: { name, email },
    },
  });
});
const deleteBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BlogServices.deleteBlogIntoDb(id);
  if (!result) {
    throw new AppError(404, 'Blog not found');
  }

  const blogPublisherDetails = await result?.populate('author', 'name email');

  const { _id, title, content, author } = blogPublisherDetails.toObject();
  const { name, email } = author;

  res.status(200).json({
    success: true,
    message: 'Blog deleted successfully',
    data: {
      _id,
      title,
      content,
      author: { name, email },
    },
  });
});
const getAllBlogs = catchAsync(async (req, res) => {
  const blogs = await BlogServices.getAllBlogsIntoDB(req.query);


  res.status(200).json({
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: 200,
    data: blogs,
  });
});

export const BlogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs
};
