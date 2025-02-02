// types/chat.ts

export interface Message {
    id: string;
    text: string;
    timestamp: Date;
    sender: 'me' | 'other';
    attachments?: {
      type: 'image' | 'file';
      url: string;
    }[];
  }
  
  export interface ChatHeaderProps {
    userName: string;
    userImage: string;
    isOnline: boolean;
    onBackPress: () => void;
  }
  
  export interface MessageItemProps {
    message: Message;
    index: number;
    previousMessage?: Message;
    nextMessage?: Message;
  }
  
  export interface DateHeaderProps {
    date: Date;
  }
  
  export interface ChatInputProps {
    onSendMessage: (text: string) => void;
    onAttachmentPress: () => void;
    onEmojiPress: () => void;
  }