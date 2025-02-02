import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/home';

const Stack = createNativeStackNavigator();

export const ChatsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="CreateMessage" component={CommunityChats} /> */}
      {/* <Stack.Screen name="CreatePost" component={CreatePost} /> */}
      {/* <Stack.Screen name="Chatting" component={Chatting} /> */}
      <Stack.Screen name="ChatList" component={Home} />
    </Stack.Navigator>
  );
};
