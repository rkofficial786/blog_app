import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DummyScreen} from '../DummyScreens';
import Home from '../../screens/home';
import BlogDetail from '../../screens/blog-details';

const Stack = createNativeStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BlogDetail" component={BlogDetail} />
      <Stack.Screen name="Settings" component={DummyScreen} />
    </Stack.Navigator>
  );
};
