import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import sizer from '../helpers/sizer';

const Ambient = ({children}: any) => {
  const {width, height} = Dimensions.get('window');
  const {theme} = useSelector((state: any) => state.theme);

  const aspectRatio = height / width;
  const screenSizeDiagonal =
    Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 160;
  const isTablet = screenSizeDiagonal >= 7 && aspectRatio <= 1.6;
  console.log(theme, 'theme');

  const backgroundImage = isTablet
    ? theme === 'light'
      ? require('../assets/bg-light-tab.png')
      : require('../assets/bg2-tab.png')
    : theme === 'light'
    ? require('../assets/bg-light.png')
    : require('../assets/bg2.png');

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover">
      <View
        
        style={[
          styles.overlay,
          theme === 'light' ? styles.lightOverlay : styles.darkOverlay,
        ]}>
        {children}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  
  },
  overlay: {
    flex: 1,
    width: '100%',
  },
  lightOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  darkOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export default Ambient;
