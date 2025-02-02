import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BlogWithAuthor} from '../../types/blogs';

interface CompactBlogCardProps {
  blog: BlogWithAuthor;
  onPress: () => void;
}

const CompactBlogCard: React.FC<CompactBlogCardProps> = ({blog, onPress}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row bg-background-secondary rounded-xl overflow-hidden h-32 mb-3">
      {/* Left: Image Section */}
      <View className="w-1/3">
        <Image
          source={{
            uri: blog.images?.[0] || '/api/placeholder/400/400',
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Right: Content Section */}
      <View className="flex-1 p-3 justify-between">
        {/* Upper: Title and Meta */}
        <View>
          {/* First Tag + Count */}
          {blog.tags.length > 0 && (
            <View className="flex-row items-center mb-1">
              <View className="bg-background-tertiary px-2 py-0.5 rounded-full">
                <Text className="text-text-secondary text-xs">
                  {blog.tags[0]}
                  {blog.tags.length > 1 ? ` +${blog.tags.length - 1}` : ''}
                </Text>
              </View>
            </View>
          )}

          {/* Title */}
          <Text
            numberOfLines={2}
            className="text-text-primary font-semibold text-base">
            {blog.title}
          </Text>
        </View>

        {/* Lower: Engagement Stats and Date */}
        <View className="flex-row items-center justify-between mt-auto">
          {/* Engagement Stats */}
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="heart-outline"
                size={16}
                color="#64748B"
              />
              <Text className="text-text-secondary text-xs ml-1">
                {blog.likes}
              </Text>
            </View>
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="comment-outline"
                size={16}
                color="#64748B"
              />
              <Text className="text-text-secondary text-xs ml-1">
                {blog.comments}
              </Text>
            </View>
          </View>

          {/* Date */}
          <Text className="text-text-secondary text-xs">
            {formatDate(blog.createdAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CompactBlogCard;
