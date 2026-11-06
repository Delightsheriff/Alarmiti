import * as Haptics from "expo-haptics";
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const PRESS = { duration: 150, easing: Easing.out(Easing.quad) };

type Props = Omit<PressableProps, "style"> & {
  style?: StyleProp<ViewStyle>;
  /** A light tap on press, for primary actions. */
  haptic?: boolean;
  /** How far to shrink while held. Large cards shrink less. */
  scaleTo?: number;
};

/** Every tappable surface: shrinks slightly while held, or dims under reduced motion. */
export function PressableScale({
  haptic,
  scaleTo = 0.96,
  disabled,
  onPressIn,
  onPressOut,
  onPress,
  style,
  ...props
}: Props) {
  const pressed = useSharedValue(0);
  const reduceMotion = useReducedMotion();

  const animated = useAnimatedStyle(() =>
    reduceMotion
      ? { opacity: 1 - pressed.value * 0.3 }
      : { transform: [{ scale: 1 - pressed.value * (1 - scaleTo) }] }
  );

  return (
    <AnimatedPressable
      accessibilityRole="button"
      {...props}
      disabled={disabled}
      onPressIn={(e) => {
        pressed.value = withTiming(1, PRESS);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        pressed.value = withTiming(0, PRESS);
        onPressOut?.(e);
      }}
      onPress={(e) => {
        if (haptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(e);
      }}
      style={[style, animated, disabled && { opacity: 0.4 }]}
    />
  );
}
