import { colors, Severity, severity, tint } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

// A drawn stand-in for a map. The concept has no map provider, so this shows
// a street grid with the approximate area around a pin.

const streets = [
  { top: "22%", left: 0, right: 0, height: 10 },
  { top: "64%", left: 0, right: 0, height: 14 },
  { left: "30%", top: 0, bottom: 0, width: 12 },
  { left: "72%", top: 0, bottom: 0, width: 8 },
] as const;

export function MapPreview({
  level = "info",
  areaSize = 140,
  style,
}: {
  level?: Severity;
  /** Diameter of the approximate-area circle. */
  areaSize?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const { color } = severity[level];
  return (
    <View
      style={[styles.map, style]}
      accessible
      accessibilityLabel="Map of the approximate area"
    >
      <View style={[styles.block, { top: "6%", left: "6%", width: "20%", height: "12%" }]} />
      <View style={[styles.block, { top: "32%", left: "38%", width: "30%", height: "26%" }]} />
      <View style={[styles.park, { top: "72%", left: "78%", width: "18%", height: "22%" }]} />
      {streets.map((street, index) => (
        <View key={index} style={[styles.street, street]} />
      ))}
      <View style={styles.center}>
        <View
          style={[
            styles.radius,
            {
              width: areaSize,
              height: areaSize,
              borderRadius: areaSize / 2,
              backgroundColor: tint(color, 0.14),
              borderColor: tint(color, 0.5),
            },
          ]}
        />
        <View style={[styles.pin, { backgroundColor: color }]}>
          <Ionicons name="location" size={16} color={colors.onAccent} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    backgroundColor: "#152031",
    overflow: "hidden",
  },
  street: {
    position: "absolute",
    backgroundColor: "#22304A",
  },
  block: {
    position: "absolute",
    borderRadius: 6,
    backgroundColor: "#1A273B",
  },
  park: {
    position: "absolute",
    borderRadius: 10,
    backgroundColor: "rgba(124, 242, 200, 0.07)",
  },
  center: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  radius: {
    position: "absolute",
    borderWidth: 1,
  },
  pin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.bg,
  },
});
