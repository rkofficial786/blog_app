import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {loginUser, registerUser, getProfile} from './actions';
import {User} from '../../types/blogs';

interface UserState {
  currentUser: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  profileData: User | null; // Added for profile data
}

const initialState: UserState = {
  currentUser: null,
  token: null,
  isLoading: false,
  error: null,
  profileData: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.currentUser = null;
      state.token = null;
      state.error = null;
      state.profileData = null;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = {...state.currentUser, ...action.payload};
      }
    },
    clearProfileData: state => {
      state.profileData = null;
    },
  },
  extraReducers: builder => {
    builder
      // Login cases
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.data.user;
        state.token = action.payload.data.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Register cases
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.data.user;
        state.token = action.payload.data.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Registration failed';
      })
      // Get Profile cases
      .addCase(getProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileData = action.payload.data;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch profile';
        state.profileData = null;
      });
  },
});

export const {logout, updateUserProfile, clearProfileData} = UserSlice.actions;
export {loginUser, registerUser, getProfile};
export default UserSlice.reducer;
