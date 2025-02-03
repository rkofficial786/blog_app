import React from 'react';
import { View, Text } from 'react-native';
import { Message } from '../../types/chats';
import { formatTime } from '../../helpers/helpers';


interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  isGrouped: boolean;
  isLastInGroup: boolean;
}

export const MessageBubble = ({
  message,
  isCurrentUser,
  isGrouped,
  isLastInGroup,
}: MessageBubbleProps) => {
  return (
    <View
      className={`flex-row ${isCurrentUser ? 'justify-end' : 'justify-start'} 
      ${isGrouped ? 'mt-1' : 'mt-2'}`}>
      <View
        className={`max-w-[80%] ${
          isCurrentUser ? 'bg-accent-primary' : 'bg-background-tertiary'
        } ${
          isGrouped
            ? isCurrentUser
              ? 'rounded-l-xl rounded-r-md'
              : 'rounded-r-xl rounded-l-md'
            : 'rounded-2xl'
        }`}>
        <View className="px-3.5 py-2">
          <Text
            className={`${
              isCurrentUser ? 'text-white' : 'text-text-primary'
            } text-[15px]`}>
            {message.content}
          </Text>
          {isLastInGroup && (
            <Text
              className={`text-[11px]  mt-0.5 ${
                isCurrentUser ? 'text-white/70 self-end' : 'text-text-tertiary'
              }`}>
              {formatTime(message.timestamp)}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};