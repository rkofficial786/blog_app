import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fetchBlogs} from '../../store/blog';
import TextInput from '../../components/input';
import BlogFilters from './filters';
import BlogCard from './blog-card';
import {BlogWithAuthor} from '../../types/blogs';

const Home = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const [blogs, setBlogs] = useState<BlogWithAuthor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {blogs: allBlogs} = useSelector((state: any) => state.blogs);

  const loadBlogs = useCallback(
    async (filters: {
      search?: string;
      expertise?: string;
      language?: string;
    }) => {
      if (isLoading) return;

      try {
        setIsLoading(true);
        const {payload} = await dispatch(fetchBlogs(filters));
        setBlogs(payload.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, isLoading],
  );

  useEffect(() => {
    loadBlogs({});
  }, []);

  useEffect(() => {
    const filters = {
      search: searchQuery,
      expertise: selectedExpertise,
      language: selectedLanguage,
    };

    const debounceTimer = setTimeout(
      () => {
        loadBlogs(filters);
      },
      searchQuery ? 500 : 0,
    );

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedExpertise, selectedLanguage]);

  const handleExpertiseChange = (expertise: string) => {
    setSelectedExpertise(expertise);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBlogs({
      search: searchQuery,
      expertise: selectedExpertise,
      language: selectedLanguage,
    });
    setRefreshing(false);
  };

  return (
    <View className="flex-1 bg-background-primary">
      {/* Header */}
      <View className="p-4 pt-0 border-b border-border-light">
        <Text className="text-2xl font-bold text-text-primary mb-2">
          Discover Stories
        </Text>

        {/* Search and Filters */}
        <View className="flex-row gap-3">
          <View className="w-10/12">
            <TextInput
              placeholder="Search blogs..."
              value={searchQuery}
              onChangeText={handleSearch}
              leftIcon={
                <MaterialCommunityIcons
                  name="magnify"
                  size={20}
                  color="#64748B"
                />
              }
            />
          </View>
          <BlogFilters
            selectedExpertise={selectedExpertise}
            selectedLanguage={selectedLanguage}
            onExpertiseChange={handleExpertiseChange}
            onLanguageChange={handleLanguageChange}
          />
        </View>
      </View>

      {/* Blog List */}
      <FlatList
        data={blogs}
        renderItem={({item}) => (
          <View className="px-4">
            <BlogCard
              blog={item}
              onPress={() =>
                navigation.navigate('BlogDetail', {blogId: item.id})
              }
            />
          </View>
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{paddingVertical: 16}}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-8">
            <Text className="text-text-secondary">
              {isLoading ? 'Loading blogs...' : 'No blogs found'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Home;
