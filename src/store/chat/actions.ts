import {createAsyncThunk} from '@reduxjs/toolkit';
import chatApi from '../../apis/chatApi';
import userApi from '../../apis/authApi';

export const fetchChatMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (data: any, {rejectWithValue}) => {
    
    try {
       console.log(data,"data");
       
      const [messagesResponse, partnerResponse] = await Promise.all([
        chatApi.getMessages(data.chatId),
        userApi.getProfile(data.partnerId),
      ]);

      console.log(messagesResponse, 'message response');

      if (!messagesResponse.data.success || !partnerResponse.data.success) {
        throw new Error('Failed to fetch chat data');
      }

      return {
        messages: messagesResponse.data.data,
        partner: partnerResponse.data.data,
        partnerID: data.partnerId,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const sendChatMessage = createAsyncThunk(
  'chat/sendMessage',
  async (
    {
      content,
      receiverId,
      senderId,
    }: {
      content: string;
      receiverId: string;
      senderId: string;
    },
    {rejectWithValue},
  ) => {
    try {
      const response = await chatApi.sendMessage({
        senderId,
        receiverId,
        content,
      });

      if (!response.data.success) {
        throw new Error('Failed to send message');
      }

      return {
        message: response.data.data,
        partnerId: receiverId,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchAllChats = createAsyncThunk(
  'chat/fetchAllChats',
  async (userId: string, {rejectWithValue}) => {
    try {
      const response = await chatApi.getChats(userId);

      console.log(response, 'response');

      if (!response.data.success) {
        throw new Error('Failed to fetch chats');
      }

      // Fetch all chat partners' details
      const partnerDetailsPromises = response.data.data.map(async chat => {
        const partnerId = chat.participants.find(id => id !== userId);
        const partnerResponse = await userApi.getProfile(partnerId);
        return {
          ...chat,
          partner: partnerResponse.data.data,
        };
      });

      const enrichedChats = await Promise.all(partnerDetailsPromises);

      console.log(enrichedChats, 'enrishced chats');

      return enrichedChats;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
