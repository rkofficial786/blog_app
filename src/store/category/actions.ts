import {createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';
import categoryApiEndpoint from '../../apis/categoryApi/config';
import categoryApi from '../../apis/categoryApi';

export const createCategory = createAsyncThunk(
  `${categoryApiEndpoint.createCategory}Post`,
  async (payload: any) => {
    console.log(payload, 'paylod category');

    const {status, data} = await categoryApi.createCategory(payload);
    return {status, data};
  },
);

export const getAllUsersCategory = createAsyncThunk(
  `${categoryApiEndpoint.getAllUsersCategory}Get`,
  async () => {
    const {status, data} = await categoryApi.getAllUsersCategory();
    return {status, data};
  },
);
