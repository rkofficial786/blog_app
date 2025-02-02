import { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { createBlog } from '../../store/blog';


export const useCreateBlog = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {currentUser} = useSelector((state: any) => state.user);
  
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handlePublish = async (content: string) => {
    if (!currentUser?.id) {
      Alert.alert('Error', 'You must be logged in to publish');
      return;
    }

    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }

    if (!content.trim()) {
      Alert.alert('Error', 'Content is required');
      return;
    }

    if (!thumbnailUrl) {
      Alert.alert('Error', 'Thumbnail image is required');
      return;
    }

    try {
      setUploading(true);
      
      const blogPayload: any = {
        title: title.trim(),
        content,
        thumbnailUrl,
        tags,
        language: 'English', 
        authorId: currentUser.id,
      };

      const result = await dispatch(createBlog(blogPayload)).unwrap();
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to publish blog');
    } finally {
      setUploading(false);
    }
  };

  return {
    title,
    setTitle,
    tags,
    setTags,
    thumbnailUrl,
    setThumbnailUrl,
    uploading,
    handlePublish,
  };
};