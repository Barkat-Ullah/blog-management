import { model, Schema } from 'mongoose';
import { IRegisterUser } from './user.interface';

const userSchema = new Schema<IRegisterUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const User = model<IRegisterUser>('User', userSchema);
