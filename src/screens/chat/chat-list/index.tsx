import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from '../../../components/avatar';
import {fetchAllChats} from '../../../store/chat';
import {Chat} from '../../../types/chats';

const ChatListItem = ({chat, onPress}: any) => {
  const {partner, messages, unreadCount, lastMessage} = chat;

  const getTimeString = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    }

    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], {month: 'short', day: 'numeric'});
    }

    return date.toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center p-4 bg-background-primary border-b border-border-light">
      <View className="relative">
        <Avatar source={partner.profileImage} name={partner.name} />
        {unreadCount > 0 && (
          <View className="absolute -top-1 -right-1 bg-accent-error rounded-full w-5 h-5 items-center justify-center">
            <Text className="text-white text-xs font-medium">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Text>
          </View>
        )}
      </View>

      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between">
          <Text className="font-medium text-text-primary">{partner.name}</Text>
          {lastMessage && (
            <Text className="text-xs text-text-tertiary">
              {getTimeString(lastMessage.timestamp)}
            </Text>
          )}
        </View>

        {lastMessage && (
          <Text
            numberOfLines={1}
            className={`text-sm mt-1 ${
              unreadCount > 0
                ? 'text-text-primary font-medium'
                : 'text-text-secondary'
            }`}>
            {lastMessage.content}
          </Text>
        )}

        <Text className="text-xs text-text-tertiary mt-1">
          {partner.expertise?.join(', ')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const ChatListScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const loading = useSelector((state: any) => state.chat.loading);
  const {currentUser} = useSelector((state: any) => state.user);
  const [chats, setChats] = useState([]);

  const fetchAllChatApi = async () => {
    try {
      const {payload} = await dispatch(fetchAllChats(currentUser.id));
      
      setChats(payload);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (currentUser?.id) {
        fetchAllChatApi();
      }
    }, [currentUser?.id]),
  );

  const handleRefresh = () => {
    if (currentUser?.id) {
      fetchAllChatApi();
    }
  };

  const handleChatPress = (chat: any) => {
    navigation.navigate('Chat', {
      authorId: chat.partner.id,
      chatId: chat.id,
    });
  };

  return (
    <View className="flex-1 bg-background-primary">
      <FlatList
        data={chats}
        renderItem={({item}) => (
          <ChatListItem  chat={item} onPress={() => handleChatPress(item)} />
        )}
        keyExtractor={(item: any,) => item.partnerId}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View className="p-8 items-center justify-center">
            <Icon
              name="message-text-outline"
              size={48}
              color="#CBD5E1"
              className="mb-4"
            />
            <Text className="text-text-secondary text-center">
              No conversations yet
            </Text>
            <Text className="text-text-tertiary text-center mt-1">
              Start chatting with bloggers by visiting their profiles
            </Text>
          </View>
        }
      />
    </View>
  );
};
