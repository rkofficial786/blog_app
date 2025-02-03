import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthorProfile from '../../screens/profile';
import EditProfile from '../../screens/profile/edit-profile';
const Stack = createNativeStackNavigator();

export const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={AuthorProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};
