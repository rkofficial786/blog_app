import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Share, ActivityIndicator} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {BlogWithAuthor} from '../../types/blogs';
import {getBlogById} from '../../store/blog/actions';
import BlogImages from './blog-images';
import BlogTags from './blog-tags';
import AuthorCard from './author-card';
import BlogEngagement from './engagement';
import {HTMLContent} from '../../components/render-html';

const BlogDetail = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const {blogId} = route.params;

  const [blog, setBlog] = useState<BlogWithAuthor | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    loadBlogDetails();
  }, [blogId]);

  const loadBlogDetails = async () => {
    try {
      setLoading(true);
      const {payload} = await dispatch(getBlogById(blogId));
      setBlog(payload.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!blog) return;
    try {
      await Share.share({
        message: `Check out this blog: ${blog.title}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAuthorPress = () => {
    if (!blog?.author) return;
    navigation.navigate('Profile', {authorId: blog.author.id});
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background-primary">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!blog) {
    return (
      <View className="flex-1 items-center justify-center bg-background-primary">
        <Text className="text-text-secondary">Blog not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background-primary">
      <BlogImages images={blog.images} mainImage />

      <View className="p-4">
        <BlogTags tags={blog.tags} />

        <Text className="text-2xl font-bold text-text-primary mb-4">
          {blog.title}
        </Text>

        <AuthorCard author={blog.author} onProfilePress={handleAuthorPress} />

        <View className="mb-3">
          <HTMLContent content={blog.content} />
        </View>

        <BlogImages images={blog.images} />

        <BlogEngagement
          likes={blog.likes}
          comments={blog.comments}
          isLiked={isLiked}
          onLike={handleLike}
          onComment={() => navigation.navigate('Comments', {blogId: blog.id})}
          onShare={handleShare}
        />
      </View>
    </ScrollView>
  );
};

export default BlogDetail;
