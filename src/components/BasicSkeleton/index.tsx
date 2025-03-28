import React, {FC, useEffect} from 'react';
import {View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

type Props = {
  className?: string;
  count?: number;
  containerClassName?: string;
};

export const BasicSkeleton: FC<Props> = ({
  className,
  count,
  containerClassName,
}) => {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, {duration: 1000}), -1, true);
  }, [shimmer]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: '#C4CDE0',
      opacity: interpolate(
        shimmer.value,
        [0, 1],
        [0.6, 1],
        Extrapolation.CLAMP,
      ),
    };
  });

  return (
    <View className={containerClassName}>
      {[...Array(count ?? 1)].map((_, index) => (
        <Animated.View
          key={index}
          className={className}
          style={animatedStyle}
        />
      ))}
    </View>
  );
};
