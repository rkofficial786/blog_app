import {mockDataStore, mockChats, mockMessages} from '../../data/mockData';
import {Message} from '../../types/chats';

const chatApi = {
  async getChats(userId: string) {
    const userChats = mockChats.filter(chat =>
      chat.participants.includes(userId),
    );

    const enrichedChats = userChats.map(chat => {
      const otherParticipantId = chat.participants.find(id => id !== userId);
      const otherParticipant = mockDataStore.users.find(
        user => user.id === otherParticipantId,
      );

      return {
        ...chat,
        otherParticipant,
      };
    });

    return {
      status: 200,
      data: {
        success: true,
        data: enrichedChats,
      },
    };
  },

  async getMessages(chatId: string) {
    const messages = mockMessages.filter(msg => {
      const chat = mockChats.find(c => c.id === chatId);
      return (
        chat?.participants.includes(msg.senderId) &&
        chat?.participants.includes(msg.receiverId)
      );
    });

    const sortedMessages = [...messages].sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    return {
      status: 200,
      data: {
        success: true,
        data: sortedMessages,
      },
    };
  },

  async sendMessage(payload: {
    senderId: string;
    receiverId: string;
    content: string;
  }) {
    let chat = mockChats.find(
      c =>
        c.participants.includes(payload.senderId) &&
        c.participants.includes(payload.receiverId),
    );

    if (!chat) {
      chat = {
        id: `chat-${Date.now()}`,
        participants: [payload.senderId, payload.receiverId],
        updatedAt: new Date().toISOString(),
      };
      mockChats.push(chat);
    }

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: payload.senderId,
      receiverId: payload.receiverId,
      content: payload.content,
      timestamp: new Date().toISOString(),
      read: false,
    };

    mockMessages.push(message);
    chat.lastMessage = message;
    chat.updatedAt = message.timestamp;

    return {
      status: 200,
      data: {
        success: true,
        data: message,
      },
    };
  },
};

export default chatApi;
