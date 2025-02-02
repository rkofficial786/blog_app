import React from 'react';
import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BlogWithAuthor} from '../../types/blogs';
import Avatar from '../../components/avatar';
import {HTMLContent} from '../../components/render-html';

interface BlogCardProps {
  blog: BlogWithAuthor;
  onPress: () => void;
}

const {width} = Dimensions.get('window');

const BlogCard: React.FC<BlogCardProps> = ({blog, onPress}) => {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-background-primary rounded-xl  mb-4 overflow-hidden  border border-border-light">
      {blog.images?.[0] && (
        <View className="relative">
          <Image
            source={{uri: blog.images[0]}}
            className="w-full h-56"
            resizeMode="cover"
          />

          <View className="absolute top-4 left-4 flex-row flex-wrap gap-2">
            {blog.tags.slice(0, 2).map((tag, index) => (
              <View
                key={index}
                className="bg-background-primary/90 px-3 py-1.5 rounded-full">
                <Text className="text-text-primary text-xs font-medium">
                  {tag}
                </Text>
              </View>
            ))}
            {blog.tags.length > 2 && (
              <View className="bg-background-primary/90 px-3 py-1.5 rounded-full">
                <Text className="text-text-primary text-xs font-medium">
                  +{blog.tags.length - 2}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}

      <View className="p-4">
        <Text className="text-xl font-bold text-text-primary mb-3 leading-tight">
          {blog.title}
        </Text>

        <View className="mb-4">
          <HTMLContent maxLines={2} content={blog.content} />
        </View>

        <View className="flex-row items-center justify-between border-t border-border-light pt-4">
          <View className="flex-row items-center">
            <Avatar
              source={blog.author?.profileImage}
              name={blog.author?.name}
              size="sm"
            />
            <View className="ml-2">
              <Text className="text-text-primary font-medium text-sm">
                {blog.author?.name}
              </Text>
              <Text className="text-text-tertiary text-xs">
                {formattedDate}
              </Text>
            </View>
          </View>

          <View className="flex-row gap-3">
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="heart-outline"
                size={18}
                color="#94A3B8"
              />
              <Text className="ml-1 text-text-tertiary text-sm">
                {blog.likes >= 1000
                  ? `${(blog.likes / 1000).toFixed(1)}K`
                  : blog.likes}
              </Text>
            </View>
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="comment-outline"
                size={18}
                color="#94A3B8"
              />
              <Text className="ml-1 text-text-tertiary text-sm">
                {blog.comments >= 1000
                  ? `${(blog.comments / 1000).toFixed(1)}K`
                  : blog.comments}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(BlogCard);
