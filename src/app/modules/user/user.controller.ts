import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserIntoDB(req?.body);
  const { _id, name, email } = result;
  res.status(200).json({
    success: true,
    message: 'User is Registered successfully',
    data: {
      _id,
      name,
      email,
    },
  });
});
const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUserIntoDB(req?.body);

  res.status(200).json({
    success: true,
    message: 'User is logged in successfully',
    data: {
      token: result.accessToken,
    },
  });
});

export const UserControllers = {
  registerUser,
  loginUser,
};
