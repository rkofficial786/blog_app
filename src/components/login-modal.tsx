import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheetModal from './BottomSheet';
import FloatingInput from './input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import sizer from '../helpers/sizer';
import Button from './button';
import {loginUser, sendOtp} from '../store/user';

interface LoginBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
  message?: string;
}

const LoginBottomSheet: React.FC<LoginBottomSheetProps> = ({
  isVisible,
  onClose,
  onLoginSuccess,
  message = '',
}) => {
  // [Previous state declarations remain the same]
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const dispatch = useDispatch<any>();
  const emailInputRef = useRef<any>(null);
  const otpInputRef = useRef<any>(null);
const {token} =useSelector((state:any)=>state.auth)

console.log(token,"token");

  // [Previous useEffect and handlers remain the same]
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const currentRef = step === 'email' ? emailInputRef : otpInputRef;
        if (currentRef.current) {
          Keyboard.dismiss();
          setTimeout(() => {
            currentRef.current?.focus();
          }, 100);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isVisible, step]);

  const startResendTimer = () => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
  };

  const handleSendOtp = async () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return;
    setIsLoading(true);
    try {
      const {payload} = await dispatch(sendOtp({email}));
      console.log(payload,"opayload sent");
      
      if (payload.status == 200) {
        setStep('otp');
        startResendTimer();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!otp.trim()) return;
    setIsLoading(true);
    try {
      const {payload} = await dispatch(loginUser({email, otp: otp.trim()}));
      console.log(payload, 'payload');

      if (payload.status == 200 && payload.data.success) {
        onLoginSuccess?.();
        onClose();
      } else {
        console.log(payload.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalHide = () => {
    setStep('email');
    setEmail('');
    setOtp('');
    setTimer(0);
  };

  const handleChangeEmail = () => {
    setStep('email');
    setOtp('');
    setTimer(0);
    setTimeout(() => emailInputRef.current?.focus(), 100);
  };

  return (
    <BottomSheetModal
      isVisible={isVisible}
      onClose={onClose}
      height={sizer.horizontalScale(430)}
      onModalHide={handleModalHide}
      title="Pleas Login">
      <View className="flex-1 justify-between h-[400px]">
        <View className="flex-1">
          <Text className=" mb-8 text-center text-light-text-secondary dark:text-dark-text-secondary max-w-[60%] mx-auto">
            {message || 'Quick login with your email - no password needed! 🚀'}
          </Text>
          {step === 'email' ? (
            <FloatingInput
              ref={emailInputRef}
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={
                email && !/\S+@\S+\.\S+/.test(email) ? 'Invalid email' : ''
              }
              {...{
                onSubmitEditing: handleSendOtp,
                returnKeyType: 'done',
                blurOnSubmit: false,
                autoFocus: true,
              }}
            />
          ) : (
            <>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-sm text-gray-600">{email}</Text>
                <TouchableOpacity onPress={handleChangeEmail}>
                  <Text className="text-blue-500">Change</Text>
                </TouchableOpacity>
              </View>
              <FloatingInput
                ref={otpInputRef}
                label="Enter Code"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                {...{
                  onSubmitEditing: handleLogin,
                  returnKeyType: 'done',
                  blurOnSubmit: false,
                  autoFocus: true,
                  maxLength: 6,
                }}
              />
              {timer > 0 ? (
                <Text className="text-sm text-gray-500 text-center mt-2">
                  Resend code in {timer}s
                </Text>
              ) : (
                <TouchableOpacity onPress={handleSendOtp} className="mt-2">
                  <Text className="text-blue-500 text-center">Resend Code</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>

        <Button
          className={`${isLoading ? 'opacity-70' : ''}  mt-4`}
          onPress={step === 'email' ? handleSendOtp : handleLogin}
          disabled={
            isLoading || (step === 'email' ? !email.trim() : !otp.trim())
          }>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-center text-white  font-semibold text-lg">
              {step === 'email' ? 'Get Secure Code' : "Let's Go!"}
            </Text>
          )}
        </Button>
      </View>
    </BottomSheetModal>
  );
};

export default LoginBottomSheet;
