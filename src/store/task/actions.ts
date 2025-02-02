import {createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';
import taskApiEndpoint from '../../apis/taskApi/config';
import taskApi from '../../apis/taskApi';

export const createTask = createAsyncThunk(
  `${taskApiEndpoint.createTask}Post`,
  async payload => {
    const {status, data} = await taskApi.createTask(payload);
    return {status, data};
  },
);
