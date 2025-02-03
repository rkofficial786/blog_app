// screens/profile/index.tsx
import React, {useState, useCallback} from 'react';
import {View, ActivityIndicator, Text, Alert} from 'react-native';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getBlogsByAuthor} from '../../store/blog';
import {logout} from '../../store/user';
import {BlogWithAuthor} from '../../types/blogs';
import UserProfile from './user-profile';
import AuthorProfile from './bloger-profile';

const ProfileContainer = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const {authorId} = route.params || {};
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const [authorBlogs, setAuthorBlogs] = useState<BlogWithAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const profileId = authorId || currentUser?.id;
  const isOwnProfile = currentUser?.id === profileId;
  const author = authorBlogs[0]?.author;

  // Determine if we're viewing a blogger's profile
  const isViewingBloggerProfile = authorId ? author?.role === 'blogger' : currentUser?.role === 'blogger';
  
  // Should show blogger view if:
  // 1. We have an authorId and that author is a blogger
  // 2. No authorId (viewing own profile) and current user is a blogger
  const shouldShowBloggerView = Boolean(
    (authorId && author?.role === 'blogger') || 
    (!authorId && currentUser?.role === 'blogger')
  );

  useFocusEffect(
    React.useCallback(() => {
      if (profileId) {
        loadAuthorData();
      }
    }, [profileId, currentUser?.id]),
  );

  const loadAuthorData = async () => {
    if (!profileId) return;

    setIsLoading(true);
    try {
      const {payload} = await dispatch(getBlogsByAuthor(profileId));

      if (payload.status === 200) {
        setAuthorBlogs(payload.data.data);
        if (!isOwnProfile && currentUser) {
          setIsFollowing(currentUser.following?.includes(profileId) || false);
        }
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadAuthorData();
    setRefreshing(false);
  }, [profileId]);

  const handleFollowPress = useCallback(async () => {
    if (!currentUser) {
      navigation.navigate('Auth');
      return;
    }

    if (isOwnProfile) return;

    try {
      setIsFollowing(prev => !prev);
      // Add your follow/unfollow API call here
    } catch (error) {
      Alert.alert('Error', 'Failed to update follow status');
      setIsFollowing(prev => !prev);
    }
  }, [currentUser, isOwnProfile, profileId]);

  const handleEditProfile = useCallback(() => {
    if (!isOwnProfile) return;
    navigation.navigate('EditProfile', {
      userId: currentUser?.id,
    });
  }, [currentUser, isOwnProfile]);

  const handleCreateBlog = useCallback(() => {
    if (!isOwnProfile || currentUser?.role !== 'blogger') return;
    navigation.navigate('CreateBlogs');
  }, [isOwnProfile, currentUser?.role]);

  const handleBlogPress = useCallback((blogId: string) => {
    navigation.navigate('BlogDetail', {blogId});
  }, []);

  const handleLogout = useCallback(async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(logout());
              navigation.reset({
                index: 0,
                routes: [{name: 'Auth'}],
              });
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          },
        },
      ],
      {cancelable: true},
    );
  }, [dispatch, navigation]);

  if (isLoading && !authorBlogs.length) {
    return (
      <View className="flex-1 items-center justify-center bg-background-primary">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!profileId) {
    return (
      <View className="flex-1 items-center justify-center bg-background-primary">
        <Text className="text-text-secondary">User not found</Text>
      </View>
    );
  }

  if (authorId && !author && !isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background-primary">
        <Text className="text-text-secondary">Profile not found</Text>
      </View>
    );
  }

  // If viewing a blogger's profile (either through authorId or own profile), show blogger view
  if (shouldShowBloggerView) {
    return (
      <AuthorProfile
        author={authorId ? author : currentUser}
        authorBlogs={authorBlogs}
        isOwnProfile={isOwnProfile}
        isFollowing={isFollowing}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onFollowPress={handleFollowPress}
        onEditPress={handleEditProfile}
        onCreateBlogPress={handleCreateBlog}
        onLogout={handleLogout}
        onBlogPress={handleBlogPress}
      />
    );
  }


  return (
    <UserProfile
      currentUser={authorId ? author : currentUser}
      isOwnProfile={isOwnProfile}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
};

export default ProfileContainer;