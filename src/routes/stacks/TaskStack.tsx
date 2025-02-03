import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/home';

const Stack = createNativeStackNavigator();

export const TaskStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="EditTask" component={Home} />
    </Stack.Navigator>
  );
};
