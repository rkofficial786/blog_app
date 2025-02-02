import React, {useState} from 'react';
import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Routes from '.';
import {useColorScheme} from 'nativewind';
import Button from '../components/button';
import BottomSheetModal from '../components/BottomSheet';
import {setTheme} from '../store/theme';
import {useDispatch, useSelector} from 'react-redux';
import Ambient from '../components/ambient';
import SubscriptionModal from '../components/subscription-modal';

export const DummyScreen = ({navigation, route}: any) => {
  return (
    <View className="flex-1 items-center justify-center p-4 dark:bg-gray-900 bg-white">
      <Text className="text-2xl font-bold my-4 dark:text-white text-gray-900">
        {route.name} Screen
      </Text>
      <Pressable
        className="bg-blue-500 px-4 py-2 rounded-lg"
        onPress={() => navigation.goBack()}>
        <Text className="text-white font-medium">Go Back</Text>
      </Pressable>
    </View>
  );
};

export const LoginScreen = ({navigation}) => {
  return (
    <View className="flex-1 items-center justify-center p-4 dark:bg-gray-900 bg-white">
      <Icon
        name="lock"
        size={50}
        className="text-blue-500 dark:text-blue-400"
      />
      <Text className="text-2xl font-bold my-4 dark:text-white text-gray-900">
        Login
      </Text>

      <Pressable
        className="w-64 bg-blue-500 px-4 py-2 rounded-lg mb-2"
        onPress={() => {
          /* Add your login logic */
        }}>
        <Text className="text-white font-medium text-center">Login</Text>
      </Pressable>

      <Pressable
        className="w-64 bg-green-500 px-4 py-2 rounded-lg mb-2"
        onPress={() => navigation.navigate('Register')}>
        <Text className="text-white font-medium text-center">Register</Text>
      </Pressable>

      <Pressable
        className="w-64 bg-gray-500 px-4 py-2 rounded-lg"
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text className="text-white font-medium text-center">
          Forgot Password
        </Text>
      </Pressable>
    </View>
  );
};

export const HomeScreen = ({navigation}) => {
  const [modal, setModal] = useState(true);
  return (
    <Ambient>
      <View className="flex-1 p-4 ">
        <Button
          className="rounded-xl w-full "
          onPress={() => {
            setModal(true);
          }}>
          Apply
        </Button>

        <View>
          <SubscriptionModal
            isVisible={modal}
            onClose={() => {
              setModal(false);
            }}
          />
        </View>

        {/* <BottomSheetModal
          isVisible={modal}
          onClose={() => {
            setModal(false);
          }}
          height={400}>
          <Text className="text-2xl font-bold mb-4 dark:text-white text-gray-900 text-center">
            Home
          </Text>

          <Pressable
            className="bg-blue-500 px-4 py-2 rounded-lg mb-2"
            onPress={() => navigation.openDrawer()}>
            <Text className="text-white font-medium text-center">
              Open Drawer
            </Text>
          </Pressable>

          <Pressable
            className="bg-blue-500 px-4 py-2 rounded-lg mb-2"
            onPress={() => navigation.navigate('Tour')}>
            <Text className="text-white font-medium text-center">
              Go to Notifications
            </Text>
          </Pressable>
        </BottomSheetModal> */}

        <View className="bg-white/20 dark:bg-black/20 p-6 rounded-2xl backdrop-blur-lg">
          <Icon
            name="home"
            size={50}
            className="text-blue-500 dark:text-blue-400 mb-2 self-center"
          />
          <Text className="text-2xl font-bold mb-4 dark:text-white text-gray-900 text-center">
            Home
          </Text>

          <Pressable
            className="bg-blue-500 px-4 py-2 rounded-lg mb-2"
            onPress={() => navigation.openDrawer()}>
            <Text className="text-white font-medium text-center">
              Open Drawer
            </Text>
          </Pressable>

          <Pressable
            className="bg-blue-500 px-4 py-2 rounded-lg mb-2"
            onPress={() => navigation.navigate('Tour')}>
            <Text className="text-white font-medium text-center">
              Go to Notifications
            </Text>
          </Pressable>

          <Pressable
            className="bg-blue-500 px-4 py-2 rounded-lg"
            onPress={() => navigation.navigate('Settings')}>
            <Text className="text-white font-medium text-center">
              Go to Settings
            </Text>
          </Pressable>
        </View>
      </View>
    </Ambient>
  );
};

export const TaskListScreen = ({navigation}) => {
  return (
    <View className="flex-1 items-center justify-center p-4 dark:bg-gray-900 bg-white">
      <Icon
        name="list"
        size={50}
        className="text-blue-500 dark:text-blue-400"
      />
      <Text className="text-2xl font-bold my-4 dark:text-white text-gray-900">
        Tasks
      </Text>

      <Pressable
        className="w-64 bg-blue-500 px-4 py-2 rounded-lg mb-2"
        onPress={() => navigation.navigate('CreateTask')}>
        <Text className="text-white font-medium text-center">Create Task</Text>
      </Pressable>

      <Pressable
        className="w-64 bg-blue-500 px-4 py-2 rounded-lg"
        onPress={() => navigation.navigate('TaskDetail', {taskId: '123'})}>
        <Text className="text-white font-medium text-center">
          View Task Detail
        </Text>
      </Pressable>
    </View>
  );
};

export const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {colorScheme, toggleColorScheme} = useColorScheme();
  const {theme} = useSelector((state: any) => state.theme);

  const handleTheme = () => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme)); // Update Redux state
    toggleColorScheme(); // Update NativeWind theme
  };

  console.log('Current Theme:', theme);
  console.log('Current Color Scheme:', colorScheme);

  return (
    <View
      className={`flex-1 items-center justify-center p-4 ${
        theme === 'dark' ? 'dark:bg-gray-900' : 'bg-white'
      }`}>
      <Icon
        name="person"
        size={50}
        color={theme === 'dark' ? 'white' : 'black'}
      />
      <Text
        className={`text-2xl font-bold my-4 ${
          theme === 'dark' ? 'dark:text-white' : 'text-gray-900'
        }`}>
        Profile
      </Text>

      <Pressable
        className="w-64 bg-blue-500 px-4 py-2 rounded-lg mb-2"
        onPress={() => navigation.navigate('EditProfile')}>
        <Text className="text-white font-medium text-center">Edit Profile</Text>
      </Pressable>

      <Pressable
        className="w-64 bg-blue-500 px-4 py-2 rounded-lg"
        onPress={() => navigation.navigate('Preferences')}>
        <Text className="text-white font-medium text-center">Preferences</Text>
      </Pressable>

      <TouchableOpacity onPress={handleTheme}>
        <Text
          className={`${
            theme === 'dark' ? 'dark:text-red-700' : 'text-gray-900'
          } my-10`}>
          Change theme
        </Text>
      </TouchableOpacity>
    </View>
  );
};
