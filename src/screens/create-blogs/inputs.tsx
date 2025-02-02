import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Animated,
  Platform,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  maxTags?: number;
  maxLength?: number;
  placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onTagsChange,
  maxTags = 10,
  maxLength = 20,
  placeholder = 'Add tags...',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const formatTag = (tag: string) => {
    return tag
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, '') // Remove special characters
      .replace(/-+/g, '-'); // Remove multiple consecutive hyphens
  };

  const handleAddTag = () => {
    const formattedTag = formatTag(inputValue);

    if (!formattedTag) {
      return;
    }

    if (formattedTag.length > maxLength) {
      Alert.alert(
        'Tag too long',
        `Tags must be ${maxLength} characters or less`,
      );
      shake();
      return;
    }

    if (tags.length >= maxTags) {
      Alert.alert(
        'Maximum tags reached',
        `You can only add up to ${maxTags} tags`,
      );
      shake();
      return;
    }

    if (tags.includes(formattedTag)) {
      Alert.alert('Duplicate tag', 'This tag already exists');
      shake();
      return;
    }

    onTagsChange([...tags, formattedTag]);
    setInputValue('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    onTagsChange(updatedTags);
  };

  const handleKeyPress = ({nativeEvent: {key}}: any) => {
    if (key === 'Backspace' && inputValue === '' && tags.length > 0) {
      const updatedTags = tags.slice(0, -1);
      onTagsChange(updatedTags);
    }
  };

  return (
    <View>
      <Animated.View
        className="flex-row items-center mb-2"
        style={{transform: [{translateX: shakeAnimation}]}}>
        <View
          className={`flex-1 flex-row items-center bg-background-secondary rounded-lg px-4 ${
            isFocused
              ? 'border border-accent-primary'
              : 'border border-transparent'
          }`}>
          <TextInput
            ref={inputRef}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder={placeholder}
            placeholderTextColor="#94A3B8"
            className="flex-1 py-2 text-text-primary"
            onSubmitEditing={() => {
              handleAddTag();
              // Keep focus and prevent keyboard dismiss
              inputRef.current?.focus();
            }}
            blurOnSubmit={false}
            onKeyPress={handleKeyPress}
            returnKeyType="done"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={maxLength}
          />
          {inputValue.length > 0 && (
            <TouchableOpacity onPress={() => setInputValue('')} className="p-2">
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color="#94A3B8"
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={handleAddTag}
          disabled={!inputValue.trim()}
          className={`ml-2 p-2 rounded-lg ${
            inputValue.trim()
              ? 'bg-accent-primary'
              : 'bg-accent-primary opacity-50'
          }`}>
          <MaterialCommunityIcons name="plus" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>

      <View className="flex-row flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Animated.View
            key={index}
            className="flex-row items-center bg-background-tertiary rounded-full overflow-hidden">
            <View className="flex-row items-center px-3 py-1.5">
              <Text className="text-text-primary">{tag}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveTag(tag)}
              className="pr-2 ">
              <MaterialCommunityIcons
                name="close-circle"
                size={18}
                color="#64748B"
              />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};
