import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/home';
import Chat from '../../screens/chat';

const Stack = createNativeStackNavigator();

export const ChatsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
     
      <Stack.Screen name="ChatList" component={Chat} />
    </Stack.Navigator>
  );
};
