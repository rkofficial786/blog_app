import React from 'react';
import { View, TextInput, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isKeyboardVisible: boolean;
}

export const ChatInput = ({
  value,
  onChangeText,
  onSend,
  isKeyboardVisible,
}: ChatInputProps) => (
  <View
    className={`flex-row items-end px-3 py-2 border-t border-border-light ${
      Platform.OS === 'ios' && isKeyboardVisible ? 'mb-1' : ''
    }`}>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Message..."
      placeholderTextColor="#94A3B8"
      className="flex-1 bg-background-tertiary/50 rounded-2xl px-4 py-2.5 mr-2 min-h-[42px] max-h-[100px]"
      multiline
      maxLength={1000}
      style={{ lineHeight: 20 }}
    />
    <TouchableOpacity
      onPress={onSend}
      disabled={!value.trim()}
      className={`p-2.5 rounded-full ${
        value.trim() ? 'bg-accent-primary' : 'bg-accent-primary/50'
      }`}>
      <Icon name="send" size={20} color="#FFFFFF" />
    </TouchableOpacity>
  </View>
);