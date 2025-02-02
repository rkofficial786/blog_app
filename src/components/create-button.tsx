import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useColorScheme} from 'nativewind';
import sizer from '../helpers/sizer';

interface CreateButtonProps {
  // Navigation target screen
  targetScreen?: string;
  // Custom label for the tooltip
  label?: string;
  // Icon name from MaterialCommunityIcons
  iconName?: string;
  // Custom position adjustments
  bottomOffset?: number;
  rightOffset?: number;
  // Custom styles
  buttonSize?: number;
  iconSize?: number;
  // Custom colors
  backgroundColor?: string;
  tooltipBackgroundColor?: {
    light: string;
    dark: string;
  };
  // Animation durations
  animationDuration?: number;
  tooltipDisplayDuration?: number;
  // Optional callback when button is pressed
  onPress?: () => void;
}

const CreateButton: React.FC<CreateButtonProps> = ({
  targetScreen = 'CreateGoal',
  label = 'Create Goal',
  iconName = 'plus',
  bottomOffset = 24,
  rightOffset = 24,
  buttonSize = 56,
  iconSize = 30,
  backgroundColor,
  tooltipBackgroundColor = {
    light: 'rgba(220,220,220,0.8)',
    dark: 'rgba(47,79,79,0.8)',
  },
  animationDuration = 800,
  tooltipDisplayDuration = 2000,
  onPress,
}) => {
  const {navigate} = useNavigation<any>();
  const translateX = useRef(
    new Animated.Value(sizer.horizontalScale(-100)),
  ).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [showLabel, setShowLabel] = React.useState(true);
  const {colorScheme} = useColorScheme();

  useFocusEffect(
    React.useCallback(() => {
      animateTooltip();
    }, []),
  );

  const animateTooltip = () => {
    // Reset values for when component remounts
    translateX.setValue(sizer.horizontalScale(60));
    opacity.setValue(0);

    Animated.sequence([
      // Fade in and slide from left
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]),
      // Wait for specified duration
      Animated.delay(tooltipDisplayDuration),
      // Slide to right and fade out
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: sizer.horizontalScale(60),
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setShowLabel(false);
    });
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigate(targetScreen);
    }
  };

  return (
    <View>
      {showLabel && (
        <Animated.View
          style={{
            transform: [{translateX}],
            opacity,
            position: 'absolute',
            bottom: sizer.horizontalScale(bottomOffset + 8),
            right: sizer.horizontalScale(rightOffset + 60),
            backgroundColor:
              colorScheme === 'dark'
                ? tooltipBackgroundColor.dark
                : tooltipBackgroundColor.light,
            paddingHorizontal: sizer.horizontalScale(12),
            paddingVertical: sizer.horizontalScale(6),
            borderRadius: sizer.horizontalScale(16),
          }}>
          <Text className="text-light-text-primary dark:text-white font-medium">
            {label}
          </Text>
        </Animated.View>
      )}
      <TouchableOpacity
        className="absolute rounded-full items-center justify-center shadow-xl bg-light-accent-primary dark:bg-dark-accent-primary"
        style={{
          bottom: sizer.horizontalScale(bottomOffset),
          right: sizer.horizontalScale(rightOffset),
          width: sizer.horizontalScale(buttonSize),
          height: sizer.horizontalScale(buttonSize),
        }}
        onPress={handlePress}
        activeOpacity={0.8}>
        <Icon
          name={iconName}
          size={sizer.horizontalScale(iconSize)}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CreateButton;
