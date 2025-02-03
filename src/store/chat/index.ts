import {createSlice} from '@reduxjs/toolkit';
import {fetchAllChats, fetchChatMessages, sendChatMessage} from './actions';

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
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        const {messages, partner, partnerId} = action.payload;
        state.activeChats[partnerId] = {
          messages,
          partner,
          unreadCount: 0,
        };
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
        if (state.activeChats[partnerId]) {
          state.activeChats[partnerId].messages.unshift(message);
        } else {
          state.activeChats[partnerId] = {
            messages: [message],
            partner: {} as User,
            unreadCount: 0,
          };
        }
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
        console.log(action, 'action for all cahts');

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
