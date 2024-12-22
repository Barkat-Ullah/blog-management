import { USER_ROLE } from "./user.constant";

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isBlocked: boolean;
}

export interface ILoginUser {
  email: string;
  password: string;
}
export type TUserRole = keyof typeof USER_ROLE;
