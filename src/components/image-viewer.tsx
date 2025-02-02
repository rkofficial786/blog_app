import React, { useState, useRef } from 'react';
import {
  Modal,
  View,
  Image,
  Dimensions,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  Text
} from 'react-native';
import { GestureHandlerRootView, PinchGestureHandler, State } from 'react-native-gesture-handler';

interface ImageViewerProps {
  imageUrls: { url: string }[];
  index: number;
  visible: boolean;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  imageUrls,
  index: initialIndex,
  visible,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const window = Dimensions.get('window');
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const initialTouchX = useRef(0);
  const initialTouchY = useRef(0);
  const accumulatedTranslateX = useRef(0);
  const accumulatedTranslateY = useRef(0);

  const pinchRef = useRef();
  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const lastScale = useRef(1);

  const resetAnimations = () => {
    scale.setValue(1);
    translateX.setValue(0);
    translateY.setValue(0);
    accumulatedTranslateX.current = 0;
    accumulatedTranslateY.current = 0;
    lastScale.current = 1;
  };

  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: pinchScale } }],
    { useNativeDriver: true }
  );

  const onPinchHandlerStateChange = (event:any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale.current *= event.nativeEvent.scale;
      baseScale.setValue(lastScale.current);
      pinchScale.setValue(1);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > 10 || Math.abs(dy) > 10;
      },
      onPanResponderGrant: (_, gestureState) => {
        initialTouchX.current = gestureState.x0;
        initialTouchY.current = gestureState.y0;
      },
      onPanResponderMove: (_, gestureState) => {
        const { dx, dy } = gestureState;
        translateX.setValue(accumulatedTranslateX.current + dx);
        translateY.setValue(accumulatedTranslateY.current + dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx, dy, vy } = gestureState;
        accumulatedTranslateX.current += dx;
        accumulatedTranslateY.current += dy;

        if (Math.abs(vy) > 0.5 && lastScale.current <= 1) {
          onClose();
          resetAnimations();
        } else if (Math.abs(dx) > window.width / 3 && lastScale.current <= 1) {
          const newIndex = dx > 0 
            ? Math.max(0, currentIndex - 1)
            : Math.min(imageUrls.length - 1, currentIndex + 1);
          
          if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
            resetAnimations();
          } else {
            // Snap back if at the end
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true,
              bounciness: 8,
            }).start();
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
              bounciness: 8,
            }).start();
            accumulatedTranslateX.current = 0;
            accumulatedTranslateY.current = 0;
          }
        } else {
          // Snap back to center
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 8,
          }).start();
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 8,
          }).start();
          accumulatedTranslateX.current = 0;
          accumulatedTranslateY.current = 0;
        }
      },
    })
  ).current;

  const animatedImageStyle = {
    transform: [
      { translateX },
      { translateY },
      { scale: Animated.multiply(baseScale, pinchScale) },
    ],
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <GestureHandlerRootView style={styles.container}>
        <View className="absolute top-12 self-center bg-black/50 px-3 py-1 rounded-full">
          <Text className="text-14 text-light-text-primary">
            {`${currentIndex + 1}/${imageUrls.length}`}
          </Text>
        </View>
        
        <PinchGestureHandler
          ref={pinchRef}
          onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchHandlerStateChange}
        >
          <Animated.View style={styles.container} {...panResponder.panHandlers}>
            <TouchableWithoutFeedback onPress={onClose}>
              <View style={styles.container}>
                <Animated.Image
                  source={{ uri: imageUrls[currentIndex].url }}
                  style={[styles.image, animatedImageStyle]}
                  resizeMode="contain"
                />
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </PinchGestureHandler>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default ImageViewer;