import React from 'react';
import {View, Text} from 'react-native';
import {useColorScheme} from 'nativewind';

interface DividerProps {
  text?: string; // Optional text to display in the middle of the divider
  color?: string; // Optional custom color for the divider
  thickness?: number;
  margin?: string;
}

const Divider = ({
  text,
  color,
  thickness = 1,
  margin = 'my-4',
}: DividerProps) => {
  const {colorScheme} = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const dividerColor = color || (isDarkMode ? '#374151' : '#D1D5DB');

  return (
    <View className={`flex-row items-center ${margin}`}>
      <View
        style={{
          flex: 1,
          height: thickness,
          backgroundColor: dividerColor,
        }}
      />

      {text && (
        <Text className="mx-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
          {text}
        </Text>
      )}

      <View
        style={{
          flex: 1,
          height: thickness,
          backgroundColor: dividerColor,
        }}
      />
    </View>
  );
};

export default Divider;
