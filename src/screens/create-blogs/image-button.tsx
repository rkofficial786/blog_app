import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';

interface ImageButtonProps {
  editor: any;
}

export const ImageButton: React.FC<ImageButtonProps> = ({ editor }) => {
  const handleImagePick = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });

      if (result.assets?.[0]?.uri) {
        const imageUri = result.assets[0].uri;
        const currentContent = await editor.getHTML();
        const imageHtml = `<img src="${imageUri}" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;" />`;
        const newContent = currentContent.replace(/<p><\/p>$/, '') + imageHtml + '<p></p>';
        editor.setContent(newContent);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  return (
    <TouchableOpacity
      onPress={handleImagePick}
      className="p-2 mx-1 bg-background-secondary rounded-md">
      <Icon name="image" size={28} color="#898989" />
    </TouchableOpacity>
  );
};