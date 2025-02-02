import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  onClear?: () => void;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({
  label,
  active = false,
  onPress,
  onClear,
  className = '',
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-3 py-2 rounded-full mr-2 mb-2 flex-row items-center ${
      active ? 'bg-accent-primary' : 'bg-background-tertiary'
    } ${className}`}>
    <Text className={active ? 'text-white' : 'text-text-secondary'}>
      {label}
    </Text>
    {active && onClear && (
      <TouchableOpacity 
        onPress={onClear}
        className="ml-1"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialCommunityIcons
          name="close-circle"
          size={16}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);

export default Chip;