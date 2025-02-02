// components/ThumbnailUploader.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';

interface ThumbnailUploaderProps {
  thumbnailUrl: string | null;
  onImageSelect: (url: string) => void;
  loading?: boolean;
}

export const ThumbnailUploader: React.FC<ThumbnailUploaderProps> = ({
  thumbnailUrl,
  onImageSelect,
  loading = false,
}) => {
  const handleImagePick = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });

      if (result.assets?.[0]?.uri) {
        onImageSelect(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <View className="mb-4">
      <Text className="text-text-secondary mb-2">Thumbnail Image</Text>
      
      {thumbnailUrl ? (
        <View className="relative rounded-lg overflow-hidden">
          <Image
            source={{ uri: thumbnailUrl }}
            className="w-full h-48 rounded-lg"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/40 flex-row items-center justify-center">
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <TouchableOpacity
                onPress={handleImagePick}
                className="bg-black/50 p-3 rounded-full">
                <MaterialCommunityIcons name="image-edit" size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={handleImagePick}
          className="border-2 border-dashed border-border-light rounded-lg p-6 items-center justify-center bg-background-secondary">
          <MaterialCommunityIcons
            name="image-plus"
            size={32}
            color="#94A3B8"
            className="mb-2"
          />
          <Text className="text-text-secondary text-center">
            Click to upload thumbnail image
          </Text>
          <Text className="text-text-tertiary text-sm text-center mt-1">
            Recommended: 1200x630px
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};