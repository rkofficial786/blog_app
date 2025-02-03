import React from 'react';
import { View, Text } from 'react-native';
import { formatMessageDate } from '../../helpers/helpers';


interface DateHeaderProps {
  timestamp: string;
}

export const DateHeader = ({ timestamp }: DateHeaderProps) => (
  <View className="py-2 px-4 my-3 flex-row justify-center">
    <View className="bg-background-tertiary/80 px-3 py-1 rounded-full">
      <Text className="text-text-secondary text-xs font-medium">
        {formatMessageDate(timestamp)}
      </Text>
    </View>
  </View>
);