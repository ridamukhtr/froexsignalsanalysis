import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler, runOnJS } from 'react-native-reanimated';
import { COLORS, SCREEN_HEIGHT } from '../../styles/theme-styles';
import { useThemeManager } from '../../lib/customHooks/useThemeManager';

const CustomBottomSheet = ({ children, isVisible, onClose }) => {

  const { bgColor, textColor } = useThemeManager();

  const MAX_HEIGHT = SCREEN_HEIGHT > 700 ? 530 : 450;
  const MIN_HEIGHT = 230;

  const translateY = useSharedValue(SCREEN_HEIGHT);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = ctx.startY + event.translationY;
      if (translateY.value < SCREEN_HEIGHT - MAX_HEIGHT) {
        translateY.value = SCREEN_HEIGHT - MAX_HEIGHT;
      } else if (translateY.value > SCREEN_HEIGHT - MIN_HEIGHT) {
        translateY.value = SCREEN_HEIGHT - MIN_HEIGHT;
      }
    },
    onEnd: () => {
      if (translateY.value > SCREEN_HEIGHT - (MIN_HEIGHT + MAX_HEIGHT) / 2) {
        translateY.value = withSpring(SCREEN_HEIGHT);
        runOnJS(onClose)();
      } else {
        translateY.value = withSpring(SCREEN_HEIGHT - MAX_HEIGHT);
      }
    },
  });

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(SCREEN_HEIGHT - MIN_HEIGHT);
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT);
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: translateY.value }] };
  });

  return isVisible ? (

    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.dimmedBackground} />
      </TouchableWithoutFeedback>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.bottomSheet, animatedStyle, { backgroundColor: bgColor }]}>
          <View style={[styles.dragIcon, { backgroundColor: COLORS.GREY_TEXT, }]} />
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  ) : null;
};

export default CustomBottomSheet;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  dimmedBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
    height: SCREEN_HEIGHT,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    bottom: 0
  },
  content: {
    height: 800,
  },
  dragIcon: {
    width: 62,
    height: 3,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 22,
  },
});
