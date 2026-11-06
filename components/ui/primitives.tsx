import { colors, radius, Severity, severity, space, tint, type } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ComponentProps, ReactNode } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { PressableScale } from "./PressableScale";

type IconName = ComponentProps<typeof Ionicons>["name"];

export function Chip({
  label,
  icon,
  selected,
  dropdown,
  onPress,
}: {
  label: string;
  icon?: IconName;
  selected?: boolean;
  dropdown?: boolean;
  onPress?: () => void;
}) {
  const color = selected ? colors.onAccent : colors.text;
  return (
    <PressableScale
      onPress={onPress}
      accessibilityState={{ selected }}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      {icon && <Ionicons name={icon} size={14} color={color} />}
      <Text style={[type.callout, { color }]}>{label}</Text>
      {dropdown && <Ionicons name="chevron-down" size={14} color={color} />}
    </PressableScale>
  );
}

/** A round icon button. The glass variant sits over photos. */
export function IconButton({
  icon,
  label,
  onPress,
  variant = "solid",
  badge,
  size = 40,
}: {
  icon: IconName;
  label: string;
  onPress?: () => void;
  variant?: "solid" | "glass";
  badge?: boolean;
  size?: number;
}) {
  const content = (
    <>
      <Ionicons name={icon} size={size * 0.48} color={colors.text} />
      {badge && <View style={styles.badgeDot} />}
    </>
  );
  return (
    <PressableScale
      onPress={onPress}
      accessibilityLabel={label}
      style={[
        styles.iconButton,
        { width: size, height: size, borderRadius: size / 2 },
        variant === "solid" && { backgroundColor: colors.surfaceRaised },
      ]}
    >
      {variant === "glass" ? (
        <BlurView intensity={30} tint="light" style={styles.glassFill}>
          {content}
        </BlurView>
      ) : (
        content
      )}
    </PressableScale>
  );
}

export function SeverityBadge({
  level,
  label,
  solid,
}: {
  level: Severity;
  label?: string;
  solid?: boolean;
}) {
  const { color } = severity[level];
  return (
    <View
      style={[
        styles.severityBadge,
        { backgroundColor: solid ? color : tint(color, 0.18) },
      ]}
    >
      {!solid && <View style={[styles.severityDot, { backgroundColor: color }]} />}
      <Text
        style={[type.caption, { color: solid ? colors.onAccent : color }]}
      >
        {label ?? severity[level].label}
      </Text>
    </View>
  );
}

/** A rounded square holding a category icon in its severity tint. */
export function IconTile({
  icon,
  level,
  size = 44,
}: {
  icon: IconName;
  level: Severity;
  size?: number;
}) {
  const { color } = severity[level];
  return (
    <View
      style={[
        styles.iconTile,
        {
          width: size,
          height: size,
          borderRadius: size * 0.32,
          backgroundColor: tint(color),
        },
      ]}
    >
      <Ionicons name={icon} size={size * 0.45} color={color} />
    </View>
  );
}

/**
 * A 1pt edge laid over a photo so pale images don't melt into the light
 * background. Pure black at low opacity, so it never tints the photo's edge.
 * Pass the photo's corner radius in `style`.
 */
export function ImageOutline({ style }: { style?: StyleProp<ViewStyle> }) {
  return <View pointerEvents="none" style={[styles.imageOutline, style]} />;
}

export function SectionHeader({
  title,
  action,
  style,
}: {
  title: string;
  action?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.sectionHeader, style]}>
      <Text style={[type.headline, { color: colors.text }]} accessibilityRole="header">
        {title}
      </Text>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  imageOutline: {
    ...StyleSheet.absoluteFill,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 36,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceRaised,
  },
  chipSelected: {
    backgroundColor: colors.accent,
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  glassFill: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.glass,
  },
  badgeDot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: severity.urgent.color,
    borderWidth: 1.5,
    borderColor: colors.surfaceRaised,
  },
  severityBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  severityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  iconTile: {
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: space.gutter,
    marginBottom: space.md,
  },
});
