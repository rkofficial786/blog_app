import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/home';
// import GoalsScreen from '../../screens/goals/goals-landing';
// import CreateGoal from '../../screens/goals/create-goals';

const Stack = createNativeStackNavigator();

export const MapsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TaskList" component={Home} />
      
    </Stack.Navigator>
  );
};
