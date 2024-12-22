import AppError from '../../error/AppError';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';

const blockUserByAdmin = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const result = await AdminServices.blockUserFromDB(userId);
  if (!result) {
    throw new AppError(403, 'User not found');
  }

  res.status(200).json({
    success: true,
    message: 'User blocked successfully',
  });
});
const deleteBlogByAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  await AdminServices.deleteBlogFromDB(id);

  res.status(200).json({
    success: true,
    message: ' successfully deleted blog',
  });
});

export const AdminControllers = {
  blockUserByAdmin,
  deleteBlogByAdmin,
};
