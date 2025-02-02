import {createSlice} from '@reduxjs/toolkit';
import { createCategory, getAllUsersCategory } from './actions';


const initialState = {};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setInitialState: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(createCategory.fulfilled, (state, action) => {});
    builder.addCase(getAllUsersCategory.fulfilled, (state, action) => {});
  },
});

export const {setInitialState} = categorySlice.actions;

export {createCategory ,getAllUsersCategory};
export default categorySlice.reducer;
