import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackNavigator} from './stacks/AuthStack';
import {MainTabNavigator} from './TabNavigator';
import {useSelector} from 'react-redux';
import AuthorProfile from '../screens/profile';
import CreateBlog from '../screens/create-blogs';
import BlogDetail from '../screens/blog-details';
import EditProfile from '../screens/profile/edit-profile';

const RootStack = createNativeStackNavigator();

export const Navigation = () => {
  const {token} = useSelector((state: any) => state.user);

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {token ? (
        <RootStack.Screen name="Main" component={MainTabNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthStackNavigator} />
      )}

      <RootStack.Screen name="Profile" component={AuthorProfile} />
      <RootStack.Screen name="CreateBlogs" component={CreateBlog} />
      <RootStack.Screen name="BlogDetail" component={BlogDetail} />
      <RootStack.Screen name="EditProfile" component={EditProfile} />
    </RootStack.Navigator>
  );
};
