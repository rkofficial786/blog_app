import { View ,Text ,ScrollView,Image ,TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
interface ImagePreviewProps {
  images: string[];
  onRemoveImage: (index: number) => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  images,
  onRemoveImage,
}) => {
  if (images.length === 0) return null;

  return (
    <View className="mb-4">
      <Text className="text-text-secondary mb-2">Images</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((uri, index) => (
          <View key={index} className="mr-2 relative">
            <Image
              source={{uri}}
              className="w-24 h-24 rounded-lg"
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => onRemoveImage(index)}
              className="absolute -top-2 -right-2 bg-accent-error rounded-full p-1">
              <MaterialCommunityIcons name="close" size={16} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
