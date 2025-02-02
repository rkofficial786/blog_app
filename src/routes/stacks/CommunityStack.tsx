import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/home';
// import CommunityChats from '../../screens/chats/chats-landing';
// import CreatePost from '../../screens/chats/create-post';
// import Chatting from '../../screens/chats/chatting';
// import ChatList from '../../screens/chats/chat-list';

const Stack = createNativeStackNavigator();

export const CommunityStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="CreateMessage" component={CommunityChats} /> */}
      {/* <Stack.Screen name="CreatePost" component={CreatePost} /> */}
      {/* <Stack.Screen name="Chatting" component={Chatting} /> */}
      <Stack.Screen name="ChatList" component={Home} />
    </Stack.Navigator>
  );
};
