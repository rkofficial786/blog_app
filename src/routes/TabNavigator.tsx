import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Animated, Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeStackNavigator} from './stacks/HomeStack';
import {ProfileStackNavigator} from './stacks/ProfileStack';
import {MapsStackNavigator} from './stacks/MapStack';
import {ChatsStackNavigator} from './stacks/ChatsStack';
import {useSelector} from 'react-redux';

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
        backgroundColor: '#E2E8F0',
        transform: [{translateX}],
      }}
    />
  );
};

export const MainTabNavigator = () => {
  const tabWidth = width / 4; // 4 tabs
  const {currentUser} = useSelector((state: any) => state.user);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          position: 'relative',
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#94A3B8',
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
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
              <MaterialCommunityIcons name="home" color={color} size={24} />
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="MapsStack"
        component={MapsStackNavigator}
        options={{
          tabBarLabel: 'Maps',
          tabBarIcon: ({color, size, focused}) => (
            <Animated.View
              style={{
                transform: [
                  {
                    scale: focused ? 1.2 : 1,
                  },
                ],
              }}>
              <MaterialCommunityIcons
                name="map-marker"
                color={color}
                size={24}
              />
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="ChatsStack"
        component={ChatsStackNavigator}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({color, size, focused}) => (
            <Animated.View
              style={{
                transform: [
                  {
                    scale: focused ? 1.2 : 1,
                  },
                ],
              }}>
              <MaterialCommunityIcons name="chat" color={color} size={24} />
            </Animated.View>
          ),
        }}
      />
      {/* {currentUser.role == 'blogger' && ( */}
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
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={24}
                />
              </Animated.View>
            ),
          }}
        />
      
    </Tab.Navigator>
  );
};
