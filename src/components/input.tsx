import React from 'react';
import { View, Text, TextInput as RNTextInput, TextInputProps } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  return (
    <View className="w-full">
      {label && (
        <Text className="text-sm font-medium text-text-primary mb-2">
          {label}
        </Text>
      )}
      <View className={`
        flex-row items-center
        px-2 py-1 rounded-lg
        bg-background-secondary
        border border-border-light
        ${error ? 'border-accent-error' : ''}
        ${className}
      `}>
        {leftIcon && (
          <View className="mr-2">
            {leftIcon}
          </View>
        )}
        <RNTextInput
          className="flex-1 text-text-primary"
          placeholderTextColor="#94A3B8"
          {...props}
        />
        {rightIcon && (
          <View className="ml-2">
            {rightIcon}
          </View>
        )}
      </View>
      {error && (
        <Text className="mt-1 text-sm text-accent-error">{error}</Text>
      )}
    </View>
  );
};

export default TextInput;