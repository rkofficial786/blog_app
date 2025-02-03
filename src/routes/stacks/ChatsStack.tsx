import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/home';
import { ChatScreen } from '../../screens/chat';
import { ChatListScreen } from '../../screens/chat/chat-list';


const Stack = createNativeStackNavigator();

export const ChatsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
     
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      {/* <Stack.Screen name="Chat" component={ChatScreen} /> */}
    </Stack.Navigator>
  );
};
