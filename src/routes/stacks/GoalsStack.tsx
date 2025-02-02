import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/home';
// import GoalsScreen from '../../screens/goals/goals-landing';
// import CreateGoal from '../../screens/goals/create-goals';

const Stack = createNativeStackNavigator();

export const GoalsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TaskList" component={Home} />
      {/* <Stack.Screen name="Goals" component={GoalsScreen} /> */}
      {/* <Stack.Screen name="CreateGoal" component={CreateGoal} /> */}
    </Stack.Navigator>
  );
};
