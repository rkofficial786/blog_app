import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Animated, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useColorScheme} from 'nativewind';
import Badge from 'react-native-vector-icons/SimpleLineIcons';
import {HomeStackNavigator} from './stacks/HomeStack';
import {TaskStackNavigator} from './stacks/TaskStack';
import {ProfileStackNavigator} from './stacks/ProfileStack';
import {GoalsStackNavigator} from './stacks/GoalsStack';
import {CommunityStackNavigator} from './stacks/CommunityStack';

const Tab = createBottomTabNavigator();
const {width} = Dimensions.get('window');

const TabBarIndicator = ({state, descriptor, navigation, tabWidth}: any) => {
  const translateX = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
      tension: 68,
      friction: 10,
    }).start();
  }, [state.index]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 8,
        left: 8,
        width: tabWidth - 16,
        height: 40,
        borderRadius: 20,
        backgroundColor: descriptor.options.indicatorBackground,
        transform: [{translateX}],
      }}
    />
  );
};

export const MainTabNavigator = () => {
  const {colorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';
  const tabWidth = width / 3; // 3 tabs

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: isDark ? '#111827' : '#ffffff',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          position: 'relative',
        },
        tabBarActiveTintColor: isDark ? '#ffffff' : '#000000',
        tabBarInactiveTintColor: isDark ? '#6b7280' : '#9ca3af',
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        indicatorBackground: isDark ? '#3b82f6' : '#dbeafe',
        tabBarButton: props => {
          const {onPress, children} = props;
          return (
            <Animated.View style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onTouchEnd={onPress}>
                {children}
              </View>
            </Animated.View>
          );
        },
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => (
            <Animated.View
              style={{
                transform: [
                  {
                    scale: focused ? 1.2 : 1,
                  },
                ],
              }}>
              <Icon name="home" color={color} size={size} />
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="TasksStack"
        component={TaskStackNavigator}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({color, size, focused}) => (
            <Animated.View
              style={{
                transform: [
                  {
                    scale: focused ? 1.2 : 1,
                  },
                ],
              }}>
              <Icon name="list" color={color} size={size} />
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="GoalsStack"
        component={GoalsStackNavigator}
        options={{
          tabBarLabel: 'Goals',
          tabBarIcon: ({color, size, focused}) => (
            <Animated.View
              style={{
                transform: [
                  {
                    scale: focused ? 1.2 : 1,
                  },
                ],
              }}>
              <Badge name="badge" color={color} size={size} />
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="CommunityStack"
        component={CommunityStackNavigator}
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({color, size, focused}) => (
            <Animated.View
              style={{
                transform: [
                  {
                    scale: focused ? 1.2 : 1,
                  },
                ],
              }}>
              <Icon name="people" color={color} size={size} />
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size, focused}) => (
            <Animated.View
              style={{
                transform: [
                  {
                    scale: focused ? 1.2 : 1,
                  },
                ],
              }}>
              <Icon name="person" color={color} size={size} />
            </Animated.View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
