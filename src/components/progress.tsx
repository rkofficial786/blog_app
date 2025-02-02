import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  progress: number; // Progress percentage (0 to 100)
  color?: string; // Custom bar color (optional)
  trackColor?: string; // Custom track color (optional)
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = '#2563EB', // Default primary color
  trackColor = '#E2E8F0', // Default track color
}) => {
  return (
    <View style={[styles.track, { backgroundColor: trackColor }]}>
      <View
        style={[
          styles.progress,
          { width: `${progress}%`, backgroundColor: color },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
});
