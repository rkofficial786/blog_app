import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Text,
  PanResponderGestureState,
  ScrollView,
} from 'react-native';
import {useColorScheme} from 'nativewind';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const BOTTOM_SHEET_HEIGHT = 450;
const DRAG_THRESHOLD = 50;
const FULL_SCREEN_THRESHOLD = 50;

interface BottomSheetModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  height?: number;
  allowFullscreen?: boolean;
  onModalHide?: () => void;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  isVisible,
  onClose,
  children,
  title,
  height = BOTTOM_SHEET_HEIGHT,
  allowFullscreen = false,
  footer,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const translateY = useRef(new Animated.Value(height)).current;
  const {colorScheme: currentTheme} = useColorScheme();
  const isDragStartedFromHeader = useRef(false);

  const currentHeight = isExpanded ? SCREEN_HEIGHT : height;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    } else {
      setIsExpanded(false);
      Animated.timing(translateY, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, height]);

  const headerPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      isDragStartedFromHeader.current = true;
    },
    onMoveShouldSetPanResponder: (_, gestureState: PanResponderGestureState) =>
      Math.abs(gestureState.dy) > 5,
    onPanResponderMove: (_, gestureState: PanResponderGestureState) => {
      const newTranslateY = Math.max(
        0,
        Math.min(gestureState.dy, currentHeight),
      );
      translateY.setValue(newTranslateY);
    },
    onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
      handlePanResponderRelease(gestureState);
      isDragStartedFromHeader.current = false;
    },
  });

  const contentPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState: PanResponderGestureState) =>
      gestureState.dy < 0 && Math.abs(gestureState.dy) > 5,
    onPanResponderMove: (_, gestureState: PanResponderGestureState) => {
      if (gestureState.dy < 0) {
        const newTranslateY = Math.max(
          0,
          Math.min(gestureState.dy, currentHeight),
        );
        translateY.setValue(newTranslateY);
      }
    },
    onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
      if (gestureState.dy < 0) {
        handlePanResponderRelease(gestureState);
      }
    },
  });

  const handlePanResponderRelease = (
    gestureState: PanResponderGestureState,
  ) => {
    if (gestureState.dy > DRAG_THRESHOLD && isDragStartedFromHeader.current) {
      if (isExpanded) {
        // Contract to default height
        setIsExpanded(false);
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0,
        }).start();
      } else if (gestureState.dy > SCREEN_HEIGHT * 0.2) {
        // Close the modal
        Animated.timing(translateY, {
          toValue: currentHeight,
          duration: 200,
          useNativeDriver: true,
        }).start(onClose);
      } else {
        // Return to default position
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0,
        }).start();
      }
    } else if (
      gestureState.dy < -FULL_SCREEN_THRESHOLD &&
      !isExpanded &&
      allowFullscreen
    ) {
      // Animate back to 0 first, then expand
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start(() => {
        setIsExpanded(true);
      });
    } else {
      // Return to current state
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    }
  };

  const handleOutsidePress = () => {
    if (isExpanded) {
      setIsExpanded(false);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: currentHeight,
        duration: 200,
        useNativeDriver: true,
      }).start(onClose);
    }
  };

  const isDarkTheme = currentTheme === 'dark';

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: isDarkTheme
              ? 'rgba(0,0,0,0.7)'
              : 'rgba(0,0,0,0.5)',
          },
        ]}
        onStartShouldSetResponder={() => true}
        onResponderRelease={handleOutsidePress}>
        <View
          style={[
            styles.containerWrapper,
            {
              height: currentHeight,
            },
          ]}>
          <Animated.View
            style={[
              styles.container,
              {
                borderColor: isDarkTheme ? 'white' : 'gray',
                transform: [{translateY}],
                backgroundColor: isDarkTheme
                  ? 'rgba(30, 30, 30, 0.9)'
                  : 'rgba(255, 255, 255, 1)',
                height: '100%',
              },
            ]}>
            <View {...headerPanResponder.panHandlers}>
              <View
                style={[
                  styles.dragHandle,
                  {
                    backgroundColor: isDarkTheme
                      ? 'rgba(255,255,255,0.3)'
                      : 'rgba(0,0,0,0.2)',
                    borderWidth: 1,
                    borderColor: isDarkTheme
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.1)',
                  },
                ]}
              />
              {title && (
                <Text className="text-xl text-center text-light-text-primary dark:text-dark-text-primary font-semibold mb-4">
                  {title}
                </Text>
              )}
            </View>
            <View style={styles.content} {...contentPanResponder.panHandlers}>
              <ScrollView nestedScrollEnabled={true}>{children}</ScrollView>
              <View>{footer}</View>
            </View>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  containerWrapper: {
    position: 'relative',
    width: '100%',
  },
  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderBottomWidth: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  content: {
    flex: 1,
    padding: 8,
  },
});

export default BottomSheetModal;
