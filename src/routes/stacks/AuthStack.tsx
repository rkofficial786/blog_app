import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { DummyScreen, LoginScreen } from '../DummyScreens';
import WelcomeScreen from '../../screens/welcome';
import Register from '../../screens/onboarding/register';
import RoleSelectionScreen from '../../screens/onboarding';
import Login from '../../screens/login';


const Stack = createNativeStackNavigator();

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};