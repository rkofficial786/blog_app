import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../store/theme';
import {useColorScheme} from 'nativewind';

const Routes = () => {
  const dispatch = useDispatch<any>();
  const {colorScheme, toggleColorScheme} = useColorScheme();
  const handleThemeChange = (newTheme: any) => {
    dispatch(setTheme(newTheme));
    toggleColorScheme();
  };
  return (
    <View style={{backgroundColor: 'red'}}>
      <View
        style={{
          position: 'absolute',
          height: 100,
          right: 0,
          top: 10,
          zIndex: 100,
        }}>
        <TouchableOpacity
          onPress={() =>
            handleThemeChange(colorScheme == 'light' ? 'dark' : 'light')
          }>
          Switch
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Routes;
