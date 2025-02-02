import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'link';

type ButtonProps = {
  title?: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  loading?: boolean;
  color?: string;
  className?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
};

const getVariantStyles = (variant: ButtonVariant = 'default', disabled: boolean, loading: boolean) => {
  const baseStyles = "flex-row items-center justify-center px-4 py-3 rounded-xl";
  const disabledStyles = (disabled || loading) ? 'opacity-50' : 'opacity-100';
  
  const variants = {
    default: {
      container: `${baseStyles} bg-accent-primary ${disabledStyles}`,
      text: 'text-white',
    },
    outline: {
      container: `${baseStyles} border-2 border-accent-primary bg-transparent ${disabledStyles}`,
      text: 'text-accent-primary',
    },
    ghost: {
      container: `${baseStyles} bg-background-tertiary ${disabledStyles}`,
      text: 'text-text-primary',
    },
    link: {
      container: `${baseStyles} bg-transparent ${disabledStyles}`,
      text: 'text-accent-primary underline',
    },
  };

  return variants[variant];
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  icon,
  loading = false,
  children,
  className,
  variant = 'default',
}) => {
  const variantStyles = getVariantStyles(variant, disabled, loading);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${variantStyles.container} ${className || ''}`}
      style={style}
    >
      {loading ? (
        <Text className={`font-medium ${variantStyles.text}`}>Loading...</Text>
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text 
            className={`text-center font-medium text-14 ${variantStyles.text} ${textStyle || ''}`}
          >
            {children}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;