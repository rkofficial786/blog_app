import {createSlice} from '@reduxjs/toolkit';
import {fetchAllChats, fetchChatMessages, sendChatMessage} from './actions';
import {User} from '../../types/blogs';

const initialState: any = {
  chats: [],
  loading: false,
  error: null,
};

const ChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChatError: state => {
      state.error = null;
    },
    clearAllChats: state => {
      state.activeChats = {};
    },
    removeChat: (state, action) => {
      const partnerId = action.payload;
      delete state.activeChats[partnerId];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchChatMessages.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action: any) => {
        state.loading = false;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(sendChatMessage.pending, state => {
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        const {message, partnerId} = action.payload;
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchAllChats.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllChats.fulfilled, (state, action) => {
        state.loading = false;

        state.chats = action.payload;
      })
      .addCase(fetchAllChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearChatError, clearAllChats, removeChat} = ChatSlice.actions;
export {fetchAllChats, sendChatMessage, fetchChatMessages};
export default ChatSlice.reducer;
