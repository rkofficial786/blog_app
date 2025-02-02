import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomSheetModal from './BottomSheet';
import {Platform} from 'react-native';
import {plans} from '../data/plans';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const SubscriptionModal = ({isVisible, onClose}: any) => {
  const proPlan = plans[0];
  const {navigate} = useNavigation<any>();
  const buttonColors = {
    light: {
      primary: ['#FFFFFF', '#F9FAFB'],
      secondary: ['#6A0DAD', '#4F46E5'],
    },
    dark: {
      primary: ['#F9FAFB', '#F3F4F6'],
      secondary: ['#4F46E5', '#4338CA'],
    },
  };

  return (
    <BottomSheetModal
      isVisible={isVisible}
      onClose={onClose}
      title="Improve your experience"
      height={580}
      allowFullscreen={true}>
      <View className="flex-1 px-4 pt-2 pb-6 ">
        <LinearGradient
          colors={proPlan.gradientColors.light}
          className="rounded-3xl shadow-xl dark:shadow-none overflow-hidden">
          <View className="p-6 relative">
            {proPlan.isPopular && (
              <View className="absolute top-1 right-6 bg-yellow-400 dark:bg-yellow-500 px-4 py-1.5 rounded-full shadow-lg">
                <Text className="text-xs font-bold text-gray-900">
                  MOST POPULAR
                </Text>
              </View>
            )}

            <View className="space-y-3 mb-8">
              <Text className="text-3xl font-bold text-white">
                {proPlan.title}
              </Text>
              <View className="flex-row items-baseline space-x-1">
                <Text className="text-5xl font-bold text-white">
                  {proPlan.price}
                </Text>
                <Text className="text-xl text-white/80">/{proPlan.period}</Text>
              </View>
            </View>

            <View className="gap-2 mb-8">
              {proPlan.features.map((feature, index) => (
                <View key={index} className="flex-row items-start space-x-3">
                  <Icon name={feature.icon} size={24} color="#FFFFFF" />
                  <View className="flex-1 ml-2">
                    <Text className="text-base font-semibold text-white">
                      {feature.text}
                    </Text>
                    <Text className="text-sm text-white/70">
                      {feature.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <TouchableOpacity activeOpacity={0.9} className="mb-3">
              <LinearGradient
                colors={buttonColors.light.primary}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                className="py-4 rounded-xl shadow-lg">
                <Text className="text-center text-lg font-bold text-gray-900">
                  Upgrade to Pro
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigate('Plans');
                onClose();
              }}
              activeOpacity={0.8}
              className="mt-2">
              <LinearGradient
                colors={buttonColors.light.secondary}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                className="py-3 rounded-xl border border-white/20">
                <Text className="text-center text-base font-semibold text-white">
                  Compare All Plans
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <TouchableOpacity onPress={onClose} className="mt-6">
          <Text className="text-center text-sm text-gray-500 dark:text-gray-400">
            Maybe later
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

export default SubscriptionModal;
