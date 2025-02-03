import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/button';
import {registerUser} from '../../store/user';
import TextInput from '../../components/input';
import sizer from '../../helpers/sizer';

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const Register = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {role} = route.params;
  const scrollViewRef = useRef<ScrollView>(null);
  const {height} =Dimensions.get('screen')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: role,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (field: keyof FormErrors, value: string) => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name is too short';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Invalid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate each field
    Object.keys(formData).forEach(key => {
      if (key === 'role') return;
      const error = validateField(key as keyof FormErrors, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  const handleFieldBlur = (field: keyof FormErrors) => {
    const error = validateField(field, formData[field]);
    setErrors(prev => ({...prev, [field]: error}));
  };

  const handleRegister = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      setLoading(true);
      await dispatch(registerUser(formData)).unwrap();
    } catch (error: any) {
      // Handle API errors
      if (error.message?.includes('email')) {
        setErrors(prev => ({...prev, email: error.message}));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background-primary">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <ScrollView
            ref={scrollViewRef}
            className="flex-1"
            contentContainerStyle={{
              minHeight: height - (Platform.OS === 'ios' ? sizer.horizontalScale(200) : sizer.horizontalScale(120)),
              paddingHorizontal: 24,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View className="pt-6">
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
                   placeholder="Enter your name"
                  value={formData.name}
                  onChangeText={text => handleFieldChange('name', text)}
                  onBlur={() => handleFieldBlur('name')}
                  error={errors.name}
                  onFocus={() => {
                    setTimeout(() => {
                      scrollViewRef.current?.scrollTo({y: 0, animated: true});
                    }, 100);
                  }}
                />
                <TextInput
                  label="Email"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={text => handleFieldChange('email', text)}
                  onBlur={() => handleFieldBlur('email')}
                  error={errors.email}
                  leftIcon={
                    <MaterialCommunityIcons
                      name="email"
                      size={20}
                      color="#64748B"
                    />
                  }
                  onFocus={() => {
                    setTimeout(() => {
                      scrollViewRef.current?.scrollTo({y: 100, animated: true});
                    }, 100);
                  }}
                />
                <TextInput
                  label="Password"
                  placeholder="Choose a password"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={text => handleFieldChange('password', text)}
                  onBlur={() => handleFieldBlur('password')}
                  error={errors.password}
                  leftIcon={
                    <MaterialCommunityIcons
                      name="lock"
                      size={20}
                      color="#64748B"
                    />
                  }
                  onFocus={() => {
                    setTimeout(() => {
                      scrollViewRef.current?.scrollTo({y: 200, animated: true});
                    }, 100);
                  }}
                />
              </View>
            </View>

            {/* Bottom Section */}
            <View className="flex-1 justify-end pb-6 mt-6">
              <View className="gap-4">
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
                  <Text className="text-text-secondary">
                    Already have an account?{' '}
                  </Text>
                  <Text
                    className="text-accent-primary"
                    onPress={() => navigation.navigate('Login')}>
                    Log in
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;