import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Message} from '../../types/chats';
import {getBlogsByAuthor} from '../../store/blog';
import {fetchChatMessages, sendChatMessage} from '../../store/chat';
import Avatar from '../../components/avatar';
import {MessageList} from './message-list';
import {ChatInput} from './chat-input';
import {ChatHeader} from './chat-header';

export const ChatScreen = () => {
  const route = useRoute<any>();
  const {authorId, chatId = ''} = route.params;
  const dispatch = useDispatch<any>();
  const {currentUser} = useSelector((state: any) => state.user);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatPartner, setChatPartner] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const fetchChatPartner = async () => {
      try {
        const {payload} = await dispatch(getBlogsByAuthor(authorId));
        if (payload.data.success) {
          setChatPartner(payload.data.data[0].author);
        }
      } catch (error) {
        console.error('Error fetching chat partner:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatPartner();
  }, [authorId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const {payload} = await dispatch(
          fetchChatMessages({partnerId: authorId, chatId}),
        );
        setMessages(payload.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (currentUser?.id) {
      fetchMessages();
    }
  }, [authorId, currentUser?.id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser?.id) return;

    try {
      const {payload} = await dispatch(
        sendChatMessage({
          senderId: currentUser.id,
          receiverId: authorId,
          content: newMessage.trim(),
        }),
      );

      setMessages(prev => [payload.message, ...prev]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background-primary">
        <ActivityIndicator color="#3B82F6" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background-primary">
      <ChatHeader chatPartner={chatPartner} />
      <MessageList messages={messages} currentUserId={currentUser?.id} />
      <ChatInput
        value={newMessage}
        onChangeText={setNewMessage}
        onSend={handleSendMessage}
        isKeyboardVisible={isKeyboardVisible}
      />
    </KeyboardAvoidingView>
  );
};
