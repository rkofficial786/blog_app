import React from 'react';
import { View } from 'react-native';
import { Toolbar } from '@10play/tentap-editor';
import { ImageButton } from './image-button';

interface CustomToolbarProps {
  editor: any;
}

export const CustomToolbar: React.FC<CustomToolbarProps> = ({ editor }) => (
  <View className="flex-row items-center justify-between py-2 px-4">
    <Toolbar editor={editor} />
    <ImageButton editor={editor} />
  </View>
);