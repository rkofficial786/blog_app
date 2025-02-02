import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the state
interface ThemeState {
  theme: 'light' | 'dark'; 
}


const initialState: ThemeState = {
  theme: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
   
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      console.log(action,"action");
      
      state.theme = action.payload;
    },
  },
});


export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
