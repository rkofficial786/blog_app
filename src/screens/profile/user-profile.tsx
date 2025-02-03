// components/profile/user-profile.tsx
import React from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {logout} from '../../store/user';
import Avatar from '../../components/avatar';
import {BlogWithAuthor} from '../../types/blogs';
import BlogCard from './blog-card';



interface UserProfileInfoProps {
  user: any;
  isOwnProfile: boolean;
}

const UserProfileInfo = ({user, isOwnProfile}: UserProfileInfoProps) => {
  const navigation = useNavigation<any>();
  return (
    <View className="px-4 py-6 bg-background-primary">
      <View className="items-center">
        <Avatar source={user?.profileImage} name={user.name} />
        <Text className="mt-4 text-xl font-semibold text-text-primary">
          {user?.name || 'User'}
        </Text>
        <Text className="mt-1 text-text-secondary">{user?.email || ''}</Text>
        {user?.bio && (
          <Text className="mt-2 text-text-secondary text-center">
            {user.bio}
          </Text>
        )}

        <View className="flex-row justify-around w-full mt-6">
          <View className="items-center">
            <Text className="text-lg font-semibold text-text-primary">
              {user?.following?.length || 0}
            </Text>
            <Text className="text-text-secondary">Following</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-semibold text-text-primary">
              {user?.followers?.length || 0}
            </Text>
            <Text className="text-text-secondary">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-semibold text-text-primary">
              {user?.savedBlogs?.length || 0}
            </Text>
            <Text className="text-text-secondary">Saved</Text>
          </View>
        </View>

        {isOwnProfile && (
          <TouchableOpacity
            className="mt-6 px-6 py-2 border border-border-light rounded-full"
            onPress={() => navigation.navigate('EditProfile')}>
            <Text className="text-text-primary font-medium">Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const SavedBlogsSection = ({blogs = []}) => {
  return (
    <View className="px-4 mt-4">
      <Text className="text-lg font-semibold text-text-primary mb-4">
        Saved Blogs
      </Text>
      {blogs.length === 0 ? (
        <View className="items-center py-8">
          <Icon name="bookmark-outline" size={48} color="#94A3B8" />
          <Text className="text-text-secondary mt-2">No saved blogs yet</Text>
        </View>
      ) : (
        blogs.map((blog: BlogWithAuthor) => (
          <BlogCard key={blog?.id} blog={blog} onPress={() => {}} />
        ))
      )}
    </View>
  );
};

interface UserProfileProps {
  currentUser: any;
  isOwnProfile: boolean;
  refreshing: boolean;
  onRefresh: () => void;
}

const UserProfile = ({
  currentUser,
  isOwnProfile,
  refreshing,
  onRefresh,
}: UserProfileProps) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const handleLogout = async () => {
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
  };

  return (
    <ScrollView
      className="flex-1 bg-background-primary"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <UserProfileInfo user={currentUser} isOwnProfile={isOwnProfile} />
      <SavedBlogsSection blogs={currentUser?.savedBlogs} />
      {isOwnProfile && (
        <View className="px-4 py-6">
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center justify-center space-x-2 bg-background-tertiary rounded-lg py-3">
            <Icon name="logout" size={24} color="#EF4444" />
            <Text className="text-accent-error font-medium text-base">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default UserProfile;