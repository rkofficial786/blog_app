import React from 'react';
import {FlatList} from 'react-native';
import {Message} from '../../types/chats';
import {DateHeader} from './date-header';
import {shouldGroupMessage, shouldShowDateHeader} from './message-helper';
import {MessageBubble} from './message-bubble';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
    const renderMessage = ({ item, index }: { item: Message; index: number }) => {
      const previousMessage = index < messages.length - 1 ? messages[index + 1] : null;
      const nextMessage = index > 0 ? messages[index - 1] : null;
      const isGrouped = shouldGroupMessage(item, previousMessage);
      const isLastInGroup = !shouldGroupMessage(item, nextMessage);
      const isCurrentUser = item.senderId === currentUserId;
      
      // For inverted list, we show header AFTER the message instead of before
      const showDateHeader = shouldShowDateHeader(item, previousMessage);
  
      return (
        <>
          <MessageBubble
            message={item}
            isCurrentUser={isCurrentUser}
            isGrouped={isGrouped}
            isLastInGroup={isLastInGroup}
          />
          {showDateHeader && <DateHeader timestamp={item.timestamp} />}
        </>
      );
    };
  
    return (
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        inverted
        className="flex-1 px-3"
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      />
    );
  };