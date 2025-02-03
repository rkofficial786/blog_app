import React from 'react';
import {View, Text, ImageBackground, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from '../../components/avatar';
import {User} from '../../types/blogs';
import {ChatButton} from './chat-button';
import {useSelector} from 'react-redux';

interface ProfileHeaderProps {
  user: User;
  isOwnProfile: boolean;
  isFollowing?: boolean;
  onFollowPress?: () => void;
  onEditPress?: () => void;
  onCreateBlogPress?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  isOwnProfile,
  isFollowing = false,
  onFollowPress,
  onEditPress,
  onCreateBlogPress,
}) => {
  const formatCount = (count: number = 0) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };
  const {currentUser} = useSelector((state: any) => state.user);

  return (
    <View className="bg-background-secondary">
      <ImageBackground
        source={{uri: user.coverImage || '/api/placeholder/400/150'}}
        className="h-32 justify-between p-4"
        resizeMode="cover">
        <View className="absolute inset-0 bg-black/30" />

        <View className="flex-row justify-end items-center z-10">
          {isOwnProfile ? (
            <View className="flex-row gap-2">
              <Pressable
                onPress={onEditPress}
                className="bg-background-secondary/90 p-2 rounded-full">
                <MaterialCommunityIcons
                  name="pencil"
                  size={20}
                  color="#64748B"
                />
              </Pressable>
              <Pressable
                onPress={onCreateBlogPress}
                className="bg-accent-primary/90 p-2 rounded-full">
                <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
              </Pressable>
            </View>
          ) : (
            <View className="flex-row items-center gap-2">
              <ChatButton authorId={user.id} currentUserId={currentUser?.id} />
              <Pressable
                onPress={onFollowPress}
                className={`px-4 py-1.5 rounded-full ${
                  isFollowing
                    ? 'bg-background-secondary/90'
                    : 'bg-accent-primary'
                }`}>
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name={isFollowing ? 'account-check' : 'account-plus'}
                    size={18}
                    color={isFollowing ? '#64748B' : '#FFFFFF'}
                  />
                  <Text
                    className={`ml-1 font-medium ${
                      isFollowing ? 'text-text-primary' : 'text-white'
                    }`}>
                    {isFollowing ? 'Following' : 'Follow'}
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
        </View>
      </ImageBackground>

      {/* Profile Info */}
      <View className="px-4 pb-4 -mt-10">
        {/* Avatar and Name */}
        <View className="mb-3">
          <Avatar source={user.profileImage} name={user.name} size="xl" />
          <Text className="text-xl font-bold text-text-primary mt-2">
            {user.name}
          </Text>
          {user.bio && (
            <Text
              className="text-text-secondary text-sm mt-1"
              numberOfLines={2}>
              {user.bio}
            </Text>
          )}
        </View>

        {/* Stats Row */}
        <View className="flex-row bg-background-tertiary rounded-xl overflow-hidden">
          <Pressable className="flex-1 py-3 items-center">
            <Text className="text-text-primary font-bold text-base">
              {formatCount(user.postCount)}
            </Text>
            <Text className="text-text-secondary text-xs mt-0.5">
              {user.postCount == 1 ? 'Post' : 'Posts'}
            </Text>
          </Pressable>
          <Pressable className="flex-1 py-3 items-center border-x border-border-light">
            <Text className="text-text-primary font-bold text-base">
              {formatCount(user.followersCount)}
            </Text>
            <Text className="text-text-secondary text-xs mt-0.5">
              Followers
            </Text>
          </Pressable>
          <Pressable className="flex-1 py-3 items-center">
            <Text className="text-text-primary font-bold text-base">
              {formatCount(user.totalLikes)}
            </Text>
            <Text className="text-text-secondary text-xs mt-0.5">Likes</Text>
          </Pressable>
        </View>

        {/* Expertise */}
        {user.expertise && user.expertise.length > 0 && (
          <View className="mt-3">
            <Text className="text-text-secondary text-xs font-semibold mb-2">
              Expertise
            </Text>
            <View className="flex-row flex-wrap gap-1">
              {user.expertise.map((exp, index) => (
                <View
                  key={index}
                  className="bg-background-tertiary px-2.5 py-1 rounded-full">
                  <Text className="text-text-secondary text-xs">{exp}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileHeader;
