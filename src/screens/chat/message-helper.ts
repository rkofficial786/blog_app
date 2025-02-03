import { Message } from "../../types/chats";


export const shouldGroupMessage = (current: Message, previous: Message | null) => {
  if (!previous) return false;
  return (
    current.senderId === previous.senderId &&
    new Date(current.timestamp).getTime() - new Date(previous.timestamp).getTime() < 120000
  );
};

export const shouldShowDateHeader = (currentMessage: Message, previousMessage: Message | null) => {
    if (!previousMessage) return true;
    
    const currentDate = new Date(currentMessage.timestamp);
    const previousDate = new Date(previousMessage.timestamp);
    
    currentDate.setHours(0, 0, 0, 0);
    previousDate.setHours(0, 0, 0, 0);
    
    return currentDate.getTime() !== previousDate.getTime();
  };