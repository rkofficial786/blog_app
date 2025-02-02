import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DummyScreen, TaskListScreen} from '../DummyScreens';
import Home from '../../screens/home';
// import Tasks from '../../screens/task/task-landing';
// import CreateTask from '../../screens/task/create-task';

const Stack = createNativeStackNavigator();

export const TaskStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="TaskList" component={Task} /> */}
      {/* <Stack.Screen name="TaskDetail" component={Tasks} /> */}
      {/* <Stack.Screen name="CreateTask" component={CreateTask} /> */}
      <Stack.Screen name="EditTask" component={Home} />
    </Stack.Navigator>
  );
};
