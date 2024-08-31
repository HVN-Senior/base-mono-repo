import { http } from '@/api/http';
import {
  type IChangePassword,
  type ICourse,
  type IForgotPassword,
  type ILoginResponse,
  type IProfile,
  type IRegisterParams,
  type IRegisterResponse,
  type IResetPassword,
  type IUser,
} from '@/api/user/types';
import axios from 'axios';

export const refetchTokenHttp = async (): Promise<ILoginResponse> => {
  const { data } = await http({
    url: '/authentication/refresh',
    method: 'GET',
  });

  return data;
};

export const registerhttp = async (params: IRegisterParams): Promise<IRegisterResponse> => {
  const { data } = await http({
    url: '/authentication/register',
    method: 'POST',
    data: params,
  });

  return data;
};

export const getUserProfile = async (): Promise<IUser> => {
  const { data } = await http({
    url: '/users/me',
    method: 'GET',
  });
  return data;
};

export const getUserProfileWithToken = async (token: string): Promise<IUser> => {
  const { data } = await http({
    url: '/user/me',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export const forgotPassword = async (params: IForgotPassword): Promise<ILoginResponse> => {
  const { data } = await http({
    url: '/authentication/forgot-password',
    method: 'POST',
    data: params,
  });

  return data;
};
export const resetPassword = async (params: IResetPassword): Promise<ILoginResponse> => {
  const { data } = await http({
    url: '/authentication/reset-password',
    method: 'POST',
    data: params,
  });

  return data;
};

export const getListCourse = async (): Promise<ICourse[]> => {
  const { data } = await http({
    url: '/user-courses/courses',
    method: 'GET',
  });
  return data;
};
export const updateProfile = async (body: IProfile): Promise<ILoginResponse> => {
  const { data } = await http({
    url: '/users/profile',
    method: 'PUT',
    data: body,
  });

  return data;
};
export const changePassword = async (body: IChangePassword): Promise<ILoginResponse> => {
  const { data } = await http({
    url: '/authentication/change-password',
    method: 'POST',
    data: body,
  });

  return data;
};
