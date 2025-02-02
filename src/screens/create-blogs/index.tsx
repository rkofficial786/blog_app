import React from 'react';
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Text,
  ScrollView,
} from 'react-native';
import {RichText, useEditorBridge} from '@10play/tentap-editor';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {TagInput} from './inputs';
import {useCreateBlog} from './useBlogEditor';
import {Header} from './blog-header';
import {CustomToolbar} from './editor-toolbar';
import {ThumbnailUploader} from './thumbnail';

type RootStackParamList = {
  CreateBlog: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'CreateBlog'>;

const CreateBlog = () => {
  const {
    title,
    setTitle,
    tags,
    setTags,
    thumbnailUrl,
    setThumbnailUrl,
    uploading,
    handlePublish,
  } = useCreateBlog();

  const editor = useEditorBridge({
    autofocus: false,
    avoidIosKeyboard: true,
    initialContent: '<p></p>',
    theme: {
      webview: {
        backgroundColor: 'white',
      },
      webviewContainer: {
        flex: 1,
      },
    },
  });

  const handlePublishClick = async () => {
    const content = await editor.getHTML();
    handlePublish(content);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <View className="flex-1">
        <Header onPublish={handlePublishClick} uploading={uploading} />

        <ScrollView className="flex-1">
          <View className="p-4">
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
              className="text-2xl font-bold text-text-primary mb-4"
              placeholderTextColor="#94A3B8"
            />

            <ThumbnailUploader
              thumbnailUrl={thumbnailUrl}
              onImageSelect={setThumbnailUrl}
              loading={uploading}
            />

            <View className="mb-4">
              <Text className="text-text-secondary mb-2">Tags</Text>
              <TagInput tags={tags} onTagsChange={setTags} />
            </View>
          </View>

          <View className="flex-1 px-4 min-h-[300]">
            <RichText editor={editor} />
          </View>
        </ScrollView>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="absolute w-full bottom-0 border-t border-border-light bg-background-primary">
          <CustomToolbar editor={editor} />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default CreateBlog;
