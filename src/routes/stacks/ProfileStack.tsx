import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { DummyScreen, ProfileScreen } from '../DummyScreens';
import AuthorProfile from '../../screens/profile';
const Stack = createNativeStackNavigator();

export const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator  screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={AuthorProfile} />
      <Stack.Screen name="EditProfile" component={DummyScreen} />
      <Stack.Screen name="Preferences" component={DummyScreen} />
    </Stack.Navigator>
  );
};