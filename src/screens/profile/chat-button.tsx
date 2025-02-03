import React, {useEffect} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {fetchAllChats} from '../../store/chat';

interface ChatButtonProps {
  authorId: string;
  currentUserId?: string;
}

export const ChatButton = ({authorId, currentUserId}: ChatButtonProps) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const chats = useSelector((state: any) => state.chat.chats);

  useEffect(() => {
    if (currentUserId) {
      dispatch(fetchAllChats(currentUserId));
    }
  }, [currentUserId]);

  if (!currentUserId || authorId === currentUserId) return null;

  // Find existing chat with this author
  const existingChat = chats?.find(
    (chat: any) =>
      chat.participants.includes(authorId) &&
      chat.participants.includes(currentUserId),
  );

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Chat', {
          authorId,
          chatId: existingChat?.id || '',
        })
      }
      className="px-4 py-1.5 rounded-full bg-background-secondary/90 flex-row items-center">
      <MaterialCommunityIcons
        name={existingChat ? 'message-text-outline' : 'message-outline'}
        size={18}
        color="#64748B"
      />
      <Text className="ml-1 font-medium text-text-primary">Message</Text>
    </TouchableOpacity>
  );
};
