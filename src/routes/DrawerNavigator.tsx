import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {MainTabNavigator} from './TabNavigator';
import DrawerContent from './DrawarContent';
import {useColorScheme} from 'nativewind';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const {colorScheme} = useColorScheme();

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.colors.customBackground,
        },
        drawerLabelStyle: {
          color: theme.colors.customText,
        },
        // headerShown: false,
      }}>
      <Drawer.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="menu" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
