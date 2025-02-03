// components/profile/author-profile.tsx
import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BlogWithAuthor} from '../../types/blogs';
import ProfileHeader from './header';
import BlogCard from './blog-card';

interface AuthorProfileProps {
  author: any;
  authorBlogs: BlogWithAuthor[];
  isOwnProfile: boolean;
  isFollowing: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onFollowPress: () => void;
  onEditPress: () => void;
  onCreateBlogPress: () => void;
  onLogout: () => void;
  onBlogPress: (blogId: string) => void;
}

const AuthorProfile = ({
  author,
  authorBlogs,
  isOwnProfile,
  isFollowing,
  refreshing,
  onRefresh,
  onFollowPress,
  onEditPress,
  onCreateBlogPress,
  onLogout,
  onBlogPress,
}: AuthorProfileProps) => {
  console.log(author, 'authopur data');

  return (
    <View className="flex-1 bg-background-primary">
      <FlatList
        data={authorBlogs}
        renderItem={({item}: {item: BlogWithAuthor}) => (
          <View className="px-4 mt-3">
            <BlogCard blog={item} onPress={() => onBlogPress(item.id)} />
          </View>
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <ProfileHeader
            user={author}
            isOwnProfile={isOwnProfile}
            isFollowing={isFollowing}
            onFollowPress={onFollowPress}
            onEditPress={onEditPress}
            onCreateBlogPress={onCreateBlogPress}
          />
        )}
        ListFooterComponent={
          isOwnProfile ? (
            <View className="px-4 py-6">
              <TouchableOpacity
                onPress={onLogout}
                className="flex-row items-center justify-center space-x-2 bg-background-tertiary rounded-lg py-3">
                <Icon name="logout" size={24} color="#EF4444" />
                <Text className="text-accent-error font-medium text-base">
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
        contentContainerStyle={{paddingBottom: 20}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View className="p-8 items-center">
            <Text className="text-text-secondary text-center">
              {isOwnProfile
                ? "You haven't created any blogs yet"
                : 'No blogs published yet'}
            </Text>
            {isOwnProfile && (
              <Text
                className="text-accent-primary mt-2"
                onPress={onCreateBlogPress}>
                Create your first blog
              </Text>
            )}
          </View>
        }
      />
    </View>
  );
};

export default AuthorProfile;
