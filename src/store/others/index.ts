import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  signupData: null,
  darkMode: false,
};

export const OtherSlice = createSlice({
  name: 'other',
  initialState: initialState,
  reducers: {
    setSignupData: (state, action) => {
      console.log(action, 'actions');
      state.signupData = action.payload;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const {setSignupData, setDarkMode} = OtherSlice.actions;
export default OtherSlice.reducer;
