import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Map from '../../screens/map';


const Stack = createNativeStackNavigator();

export const MapsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};
