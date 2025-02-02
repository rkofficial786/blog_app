import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const getAvatarSize = (size: AvatarSize = 'md'): number => {
  const sizes = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
  };
  return sizes[size];
};

const getFontSize = (size: AvatarSize = 'md'): number => {
  const sizes = {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  };
  return sizes[size];
};

const getInitials = (name: string = ''): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({
  source,
  name = '',
  size = 'md',
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);
  const dimensionStyle = { width: getAvatarSize(size), height: getAvatarSize(size) };
  const fontSize = getFontSize(size);

  if (!source || imageError) {
    return (
      <View
        className={`bg-gray-600 rounded-full items-center justify-center ${className}`}
        style={dimensionStyle}>
        <Text
          className="text-white font-medium"
          style={{ fontSize }}>
          {getInitials(name)}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: source }}
      className={`rounded-full ${className}`}
      style={dimensionStyle}
      onError={() => setImageError(true)}
    />
  );
};

export default Avatar;