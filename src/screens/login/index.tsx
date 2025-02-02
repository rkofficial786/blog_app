// src/screens/auth/LoginScreen.tsx
import React, {useState} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {loginUser} from '../../store/user';
import TextInput from '../../components/input';
import Button from '../../components/button';

const Login = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await dispatch(loginUser(formData));

      console.log(response, 'login payload');
    } catch (error) {
      Alert.alert(
        'Login Failed',
        'Please check your credentials and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background-primary">
      {/* Header */}
      <ScrollView className="flex-1 px-6">
        <View className="pt-12 pb-6 px-6 items-center">
          <MaterialCommunityIcons
            name="notebook-edit-outline"
            size={60}
            color="#3B82F6"
          />
          <Text className="text-2xl font-bold text-text-primary mt-4">
            Welcome Back
          </Text>
          <Text className="text-base text-text-secondary mt-2 text-center">
            Sign in to continue your blogging journey
          </Text>
        </View>

        {/* Login Form */}

        <View className="gap-6">
          <TextInput
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={text => setFormData(prev => ({...prev, email: text}))}
            leftIcon={
              <MaterialCommunityIcons name="email" size={20} color="#64748B" />
            }
          />

          <TextInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={text =>
              setFormData(prev => ({...prev, password: text}))
            }
            leftIcon={
              <MaterialCommunityIcons name="lock" size={20} color="#64748B" />
            }
            rightIcon={
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#64748B"
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View className="p-6 gap-4">
        <Button
          onPress={handleLogin}
          loading={loading}
          className="w-full"
          icon={
            <MaterialCommunityIcons name="login" size={20} color="#FFFFFF" />
          }>
          Sign In
        </Button>

        {/* Create Account Link */}
        <View className="flex-row justify-center items-center gap-1">
          <Text className="text-text-secondary">Don't have an account?</Text>
          <Text
            className="text-accent-primary font-medium"
            onPress={() => navigation.navigate('RoleSelection')}>
            Sign Up
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
