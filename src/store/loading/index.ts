import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  
};

export const LoadSlice = createSlice({
  name: 'load',
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  
  },
});

export const {setLoading} = LoadSlice.actions;
export default LoadSlice.reducer;
