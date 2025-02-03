import React from 'react';
import {StatusBar} from 'react-native';
import {useColorScheme} from 'nativewind';
import Colors from '../constants/colors';

const CustomStatusBar = () => {
  return (
    <StatusBar
      barStyle={'light-content'}
      backgroundColor={Colors.light.background.primary}
      translucent
    />
  );
};

export default CustomStatusBar;
