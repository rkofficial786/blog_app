import React from 'react';
import {StatusBar} from 'react-native';
import {useColorScheme} from 'nativewind';
import Colors from '../constants/colors';

const CustomStatusBar = () => {
  const {colorScheme} = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <StatusBar
      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      backgroundColor={
        isDarkMode
          ? Colors.dark.background.primary
          : Colors.light.background.primary
      }
      translucent
    />
  );
};

export default CustomStatusBar;
