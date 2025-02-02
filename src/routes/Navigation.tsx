import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackNavigator} from './stacks/AuthStack';
import {DrawerNavigator} from './DrawerNavigator';
import {MainTabNavigator} from './TabNavigator';
import {View} from 'react-native';
import Routes from '.';
import {useSelector} from 'react-redux';
import AuthorProfile from '../screens/profile';
// import AppTour from '../screens/tour';
// import Plans from '../screens/plans';

const RootStack = createNativeStackNavigator();

export const Navigation = () => {
  const {token} = useSelector((state: any) => state.user);

  return (
    // <NavigationContainer>
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {token ? (
        <RootStack.Screen name="Main" component={MainTabNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthStackNavigator} />
      )}
      {/* <RootStack.Screen name="Tour" component={AppTour} /> */}
      {/* <RootStack.Screen name="Plans" component={Plans} /> */}
      <RootStack.Screen name="Profile" component={AuthorProfile} />
    </RootStack.Navigator>
    // </NavigationContainer>
  );
};
