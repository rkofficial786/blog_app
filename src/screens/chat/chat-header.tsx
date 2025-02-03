import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {User} from '../../types/blogs';
import Avatar from '../../components/avatar';

interface ChatHeaderProps {
  chatPartner: User;
}

export const ChatHeader = ({chatPartner}: ChatHeaderProps) => {
  const navigation = useNavigation();

  if (!chatPartner) return null;

  return (
    <View className="px-4 py-3.5 border-b border-border-light flex-row items-center bg-background-primary">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="mr-3 p-1">
        <Icon name="arrow-left" size={24} color="#64748B" />
      </TouchableOpacity>

      <Avatar source={chatPartner.profileImage} name={chatPartner.name}/>

      <View className="flex-1 ml-4">
        <Text className="font-semibold text-text-primary text-base">
          {chatPartner.name}
        </Text>
        <Text className="text-xs text-text-secondary mt-0.5">
          {chatPartner.expertise?.[0]}
        </Text>
      </View>
    </View>
  );
};
