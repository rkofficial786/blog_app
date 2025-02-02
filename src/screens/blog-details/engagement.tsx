import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface BlogEngagementProps {
  likes: number;
  comments: number;
  isLiked: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

const BlogEngagement: React.FC<BlogEngagementProps> = ({
  likes,
  comments,
  isLiked,
  onLike,
  onComment,
  onShare,
}) => (
  <View className="flex-row justify-between items-center py-4 border-t border-border-light">
    <View className="flex-row items-center gap-6">
      <TouchableOpacity onPress={onLike} className="flex-row items-center">
        <MaterialCommunityIcons
          name={isLiked ? 'heart' : 'heart-outline'}
          size={24}
          color={isLiked ? '#EF4444' : '#64748B'}
        />
        <Text className="ml-2 text-text-secondary">{likes}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row items-center"
        onPress={onComment}>
        <MaterialCommunityIcons
          name="comment-outline"
          size={24}
          color="#64748B"
        />
        <Text className="ml-2 text-text-secondary">{comments}</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity onPress={onShare}>
      <MaterialCommunityIcons
        name="share-variant"
        size={24}
        color="#64748B"
      />
    </TouchableOpacity>
  </View>
);

export default BlogEngagement;