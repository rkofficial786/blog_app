import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Toast, {BaseToastProps} from 'react-native-toast-message';
import {useColorScheme} from 'nativewind';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import sizer from '../helpers/sizer';

const colors = {
  light: {
    success: '#10B981',
    error: '#EF4444',
    info: '#3B82F6',
    text: '#1F2937',
    textSecondary: '#4B5563',
    background: '#FFFFFF',
  },
  dark: {
    success: '#059669',
    error: '#DC2626',
    info: '#2563EB',
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    background: '#1F2937',
  },
};

const ToastIcon = ({type, color}: {type: string; color: string}) => {
  const iconMap = {
    success: 'check-circle',
    error: 'error',
    info: 'info',
  };

  return (
    <MaterialIcons
      name={iconMap[type as keyof typeof iconMap]}
      size={24}
      color={color}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    minHeight: sizer.horizontalScale(64),
    width: '90%',
    borderRadius: sizer.horizontalScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizer.horizontalScale(12),
    paddingHorizontal: sizer.horizontalScale(16),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    flex: 1,
    marginLeft: sizer.horizontalScale(12),
  },
  title: {
    fontSize: sizer.fontScale(16),
    fontWeight: '600',
    marginBottom: sizer.horizontalScale(2),
  },
  message: {
    fontSize: sizer.fontScale(14),
  },
});

const CustomToast = ({type, props}: {type: string; props: BaseToastProps}) => {
  const {colorScheme} = useColorScheme();
  const isDark = colorScheme === 'dark';
  const themeColors = isDark ? colors.dark : colors.light;

  const backgroundColor = themeColors[type as keyof typeof themeColors];
  const textColor = isDark ? colors.dark.text : colors.light.text;
  const secondaryTextColor = isDark
    ? colors.dark.textSecondary
    : colors.light.textSecondary;

  return (
    <View style={[styles.base, {backgroundColor}]}>
      <ToastIcon type={type} color={textColor} />
      <View style={styles.content}>
        <Text style={[styles.title, {color: textColor}]}>{props.text1}</Text>
        {props.text2 && (
          <Text style={[styles.message, {color: secondaryTextColor}]}>
            {props.text2}
          </Text>
        )}
      </View>
    </View>
  );
};

const toastConfig = {
  success: (props: BaseToastProps) => (
    <CustomToast type="success" props={props} />
  ),
  error: (props: BaseToastProps) => <CustomToast type="error" props={props} />,
  info: (props: BaseToastProps) => <CustomToast type="info" props={props} />,
};

export {toastConfig};
