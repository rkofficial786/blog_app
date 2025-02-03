import React from 'react';
import {TouchableOpacity, View, Text, Pressable} from 'react-native';
import Avatar from '../../components/avatar';
import {User} from '../../types/blogs';
import {useSelector} from 'react-redux';

interface AuthorCardProps {
  author: User;
  onProfilePress: () => void;
  onFollowPress?: () => void;
}

const AuthorCard: React.FC<AuthorCardProps> = ({
  author,
  onProfilePress,
  onFollowPress,
}) => {
  const {currentUser} = useSelector((state: any) => state.user);
  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <TouchableOpacity
      onPress={onProfilePress}
      className="bg-background-secondary p-3 rounded-xl mb-3">
      <View className="flex-row items-center justify-between">
        {/* Author Info */}
        <View className="flex-row items-center flex-1">
          <Avatar source={author.profileImage} name={author.name} size="md" />
          <View className="ml-2 flex-1 mr-3">
            <Text className="text-text-primary font-semibold" numberOfLines={1}>
              {author.name}
            </Text>
            {/* Stats Row */}
            <View className="flex-row items-center mt-1">
              <Text className="text-text-secondary text-xs">
                <Text className="text-text-primary font-medium">
                  {formatCount(author.followersCount || 0)}
                </Text>{' '}
                followers
              </Text>
              <Text className="text-text-secondary mx-1">•</Text>
              <Text className="text-text-secondary text-xs">
                <Text className="text-text-primary font-medium">
                  {author.postCount || 0}
                </Text>{' '}
                {author.postCount == 1 ? 'post' : 'Posts'}
              </Text>
            </View>
          </View>
        </View>

       
        {currentUser.id !== author.id && (
          <Pressable
            onPress={onFollowPress}
            className="px-3 py-1.5 rounded-full border border-accent-primary">
            <Text className="text-accent-primary text-xs font-medium">
              Follow
            </Text>
          </Pressable>
        )}
      </View>

      {/* Expertise Tags */}
      {author.expertise && author.expertise.length > 0 && (
        <View className="flex-row flex-wrap gap-1 mt-2">
          {author.expertise.slice(0, 2).map((exp, index) => (
            <View
              key={index}
              className="bg-background-tertiary px-2 py-0.5 rounded-full">
              <Text className="text-text-secondary text-xs">{exp}</Text>
            </View>
          ))}
          {author.expertise.length > 2 && (
            <View className="bg-background-tertiary px-2 py-0.5 rounded-full">
              <Text className="text-text-secondary text-xs">
                +{author.expertise.length - 2}
              </Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AuthorCard;
