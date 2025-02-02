import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
  Alert,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getBlogsByAuthor} from '../../store/blog';

import BottomSheetModal from '../../components/BottomSheet';
import {BlogWithAuthor} from '../../types/blogs';
import ProfileHeader from './header';
import BlogCard from './blog-card';

interface BlogCard {
  item: BlogWithAuthor;
}

const AuthorProfile = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const {authorId} = route.params;
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const [authorBlogs, setAuthorBlogs] = useState<BlogWithAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const isOwnProfile = currentUser?.id === authorId;
  const author = authorBlogs[0]?.author;

  useEffect(() => {
    loadAuthorData();
    return () => {
      //   dispatch(clearAuthorBlogs());
    };
  }, [authorId]);

  const loadAuthorData = async () => {
    try {
      const {payload} = await dispatch(getBlogsByAuthor(authorId));
      console.log(payload, 'auth blog');

      if (payload.status == 200) {
        setAuthorBlogs(payload.data.data);
      }
      if (!isOwnProfile && currentUser) {
        setIsFollowing(currentUser.following?.includes(authorId) || false);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to load profile data');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAuthorData();
    setRefreshing(false);
  };

  const handleFollowPress = useCallback(async () => {
    if (!currentUser) {
      navigation.navigate('Auth');
      return;
    }

    try {
      // TODO: Implement follow/unfollow API call
      setIsFollowing(prev => !prev);
      // You would typically make an API call here
      // const action = isFollowing ? unfollowUser : followUser;
      // await dispatch(action(authorId)).unwrap();
    } catch (error) {
      Alert.alert('Error', 'Failed to update follow status');
    }
  }, [currentUser, authorId]);

  const handleEditProfile = useCallback(() => {
    navigation.navigate('EditProfile', {
      userId: currentUser?.id,
    });
  }, [currentUser]);

  const handleCreateBlog = useCallback(() => {
    navigation.navigate('CreateBlog');
  }, []);

  const handleBlogPress = useCallback((blogId: string) => {
    navigation.navigate('BlogDetail', {blogId});
  }, []);

  const renderBlogItem = ({item}: BlogCard) => (
    <View className="px-4 mt-3">
      <BlogCard blog={item} onPress={() => handleBlogPress(item.id)} />
    </View>
  );

  if (isLoading && !authorBlogs.length) {
    return (
      <View className="flex-1 items-center justify-center bg-background-primary">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!author) {
    return (
      <View className="flex-1 items-center justify-center bg-background-primary">
        <Text className="text-text-secondary">Profile not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background-primary">
      <FlatList
        data={authorBlogs}
        renderItem={renderBlogItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <ProfileHeader
            user={author}
            isOwnProfile={isOwnProfile}
            isFollowing={isFollowing}
            onFollowPress={handleFollowPress}
            onEditPress={handleEditProfile}
            onCreateBlogPress={handleCreateBlog}
          />
        )}
        contentContainerStyle={{paddingBottom: 20}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
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
                onPress={handleCreateBlog}>
                Create your first blog
              </Text>
            )}
          </View>
        }
      />

      {/* Options Modal (if needed) */}
      <BottomSheetModal
        isVisible={showOptionsModal}
        onClose={() => setShowOptionsModal(false)}
        title="Options">
        <View className="p-4">{/* Add options here */}</View>
      </BottomSheetModal>
    </View>
  );
};

export default AuthorProfile;
