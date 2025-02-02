import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/button';
import {registerUser} from '../../store/user';
import TextInput from '../../components/input';

const Register = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation();
  const route = useRoute();
  const {role} = route.params;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: role,
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      await dispatch(registerUser(formData)).unwrap();
      navigation.reset({
        index: 0,
        routes: [{name: 'MainApp'}],
      });
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background-primary">
      <ScrollView className="flex-1 p-6">
        <Text className="text-2xl font-bold text-text-primary mb-2">
          Create your account
        </Text>
        <Text className="text-base text-text-secondary mb-8">
          {role === 'blogger'
            ? 'Start sharing your stories with the world'
            : 'Join our community of readers'}
        </Text>

        <View className="gap-6">
          <TextInput
            label="Full Name"
            value={formData.name}
            onChangeText={text => setFormData(prev => ({...prev, name: text}))}
          />
          <TextInput
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={text => setFormData(prev => ({...prev, email: text}))}
            leftIcon={
              <MaterialCommunityIcons name="email" size={20} color="#64748B" />
            }
          />
          <TextInput
            label="Password"
            placeholder="Choose a password"
            secureTextEntry
            value={formData.password}
            onChangeText={text =>
              setFormData(prev => ({...prev, password: text}))
            }
            leftIcon={
              <MaterialCommunityIcons name="lock" size={20} color="#64748B" />
            }
          />
        </View>
      </ScrollView>

      <View className="p-6 gap-4">
        <Button
          onPress={handleRegister}
          loading={loading}
          className="w-full"
          icon={
            <MaterialCommunityIcons
              name="account-plus"
              size={20}
              color="#FFFFFF"
            />
          }>
          Create Account
        </Button>
        <View className="flex-row justify-center">
          <Text className="text-text-secondary">Already have an account? </Text>
          <Text
            className="text-accent-primary"
            onPress={() => navigation.navigate('Login')}>
            Log in
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Register;
