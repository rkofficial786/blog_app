import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/button';

const {width} = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 bg-background-primary">
      {/* Hero Section */}
      <View className="flex-1 items-center justify-center p-6">
        {/* <Image
          source={require('../../assets/welcome-illustration.png')}
          style={{width: width * 0.8, height: width * 0.8}}
          resizeMode="contain"
        /> */}
        <Text className="text-3xl font-bold text-text-primary mt-8 text-center">
          Welcome to BlogMingle
        </Text>
        <Text className="text-base text-text-secondary mt-4 text-center px-6">
          Connect with amazing writers and discover stories that matter to you
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="p-6 gap-4">
        <Button
          variant="default"
          onPress={() => navigation.navigate('RoleSelection')}
          className="w-full">
          Get Started
        </Button>
        <Button
          variant="outline"
          onPress={() => navigation.navigate('Login')}
          className="w-full">
          I already have an account
        </Button>
      </View>
    </View>
  );
};

export default WelcomeScreen;
