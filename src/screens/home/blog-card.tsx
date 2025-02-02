import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BlogPost, BlogWithAuthor} from '../../types/blogs';
import Avatar from '../../components/avatar';

interface BlogCardProps {
  blog: BlogWithAuthor;
  onPress: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({blog, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-background-secondary rounded-xl mb-4 overflow-hidden">
      {/* Blog Image */}
      {blog.images?.[0] && (
        <Image
          source={{uri: blog.images[0]}}
          className="w-full h-48"
          resizeMode="cover"
        />
      )}

      <View className="p-4">
        {/* Author Info */}
        <View className="flex-row items-center mb-3">
          <Avatar
            source={blog.author?.profileImage}
            name={blog.author?.name}
            size="md"
          />
          <View className="ml-3">
            <Text className="text-text-primary font-medium">
              {blog.author?.name}
            </Text>
            <Text className="text-text-secondary text-sm">
              {new Date(blog.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Blog Content */}
        <Text className="text-lg font-bold text-text-primary mb-2">
          {blog.title}
        </Text>
        <Text numberOfLines={3} className="text-text-secondary mb-3">
          {blog.content}
        </Text>

        {/* Tags */}
        <View className="flex-row flex-wrap gap-2">
          {blog.tags.map((tag, index) => (
            <View
              key={index}
              className="bg-background-tertiary px-3 py-1 rounded-full">
              <Text className="text-text-secondary text-sm">{tag}</Text>
            </View>
          ))}
        </View>

        {/* Engagement Stats */}
        <View className="flex-row mt-4 gap-4">
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="heart-outline"
              size={20}
              color="#64748B"
            />
            <Text className="ml-1 text-text-secondary">{blog.likes}</Text>
          </View>
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="comment-outline"
              size={20}
              color="#64748B"
            />
            <Text className="ml-1 text-text-secondary">{blog.comments}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BlogCard;
