import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, } from 'react-native-reanimated';

const AnimatedIcon = ({ direction = "left", color = "#000", size = 25 }) => {
  const paths = {
    left: "M15 18L9 12L15 6",
    right: "M9 18L15 12L9 6",
  };

  const selectedPath = paths[direction] || paths.left;

  const translation = useSharedValue(0);

  useEffect(() => {
    translation.value = withRepeat(
      withTiming(10, { duration: 1000 }), 
      -1, 
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translation.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <Svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path d={selectedPath} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default AnimatedIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
