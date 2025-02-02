import React from 'react';
import {ScrollView, View, Text} from 'react-native';

interface BlogTagsProps {
  tags: string[];
}

const BlogTags: React.FC<BlogTagsProps> = ({tags}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    className="mb-4">
    {tags.map((tag, index) => (
      <View
        key={index}
        className="bg-background-tertiary px-3 py-1 rounded-full mr-2">
        <Text className="text-text-secondary text-sm">{tag}</Text>
      </View>
    ))}
  </ScrollView>
);

export default BlogTags;