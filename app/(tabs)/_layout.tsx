import { FloatingTabBar } from "@/components/FloatingTabBar";
import { colors } from "@/theme/tokens";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        tabBar={(props) => <FloatingTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: colors.bg },
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Nearby" }} />
        <Tabs.Screen name="activities" options={{ title: "Updates" }} />
        <Tabs.Screen name="profile" options={{ title: "You" }} />
      </Tabs>
      {/* Keeps the status bar readable over scrolled content. */}
      <LinearGradient
        colors={[colors.bg, "rgba(244, 244, 241, 0.6)", "rgba(244, 244, 241, 0)"]}
        style={[styles.statusFade, { height: insets.top + 16 }]}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statusFade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});
