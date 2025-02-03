import {createAsyncThunk} from '@reduxjs/toolkit';
import {userApiEndpoints} from '../../apis/authApi/config';
import userApi from '../../apis/authApi';
import { User } from '../../types/blogs';

export const loginUser = createAsyncThunk(
  `${userApiEndpoints.login}Post`,
  async ({email, password}: {email: string; password: string}) => {
    const response = await userApi.login({email: email, password: password});
    return response.data;
  },
);

export const registerUser = createAsyncThunk(
  `${userApiEndpoints.register}Post`,
  async (userData: Partial<User>) => {
    const response = await userApi.register(userData);
    return response.data;
  },
);


export const getProfile = createAsyncThunk(
  `${userApiEndpoints.getProfile}Get`,
  async (userId: string) => {
    const response = await userApi.getProfile(userId);
    return response.data;
  },
);

