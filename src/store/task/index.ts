import {createSlice} from '@reduxjs/toolkit';
import {createTask} from './actions';

const initialState = {};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setInitialState: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(createTask.fulfilled, (state, action) => {});
  },
});

export const {setInitialState} = taskSlice.actions;

export {createTask};
export default taskSlice.reducer;
