import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  onPublish: () => void;
  uploading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onPublish, uploading }) => {
  const navigation = useNavigation();
  
  return (
    <View className="flex-row items-center justify-between p-4 border-b border-border-light">
      <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
        <Text className="text-text-secondary">Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPublish}
        disabled={uploading}
        className="px-4 py-2 bg-accent-primary rounded-lg">
        <Text className="text-white">
          {uploading ? 'Publishing...' : 'Publish'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};