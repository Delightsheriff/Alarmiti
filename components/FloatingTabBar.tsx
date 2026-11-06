import { PressableScale } from "@/components/ui/PressableScale";
import { colors, radius, shadow, type } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs, useRouter } from "expo-router";
import { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IconName = ComponentProps<typeof Ionicons>["name"];
type TabBarProps = Parameters<
  NonNullable<ComponentProps<typeof Tabs>["tabBar"]>
>[0];

const tabs: Record<
  string,
  { label: string; icon: IconName; active: IconName }
> = {
  index: { label: "Nearby", icon: "compass-outline", active: "compass" },
  activities: { label: "Updates", icon: "pulse-outline", active: "pulse" },
  profile: { label: "You", icon: "person-outline", active: "person" },
};

/**
 * A floating pill of tabs with the Report button beside it. The active tab
 * widens to show its label; the others are icons only.
 */
export function FloatingTabBar({ state, emitter, navigateToTab }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      style={[styles.wrap, { bottom: Math.max(insets.bottom - 6, 12) }]}
      pointerEvents="box-none"
    >
      <View style={[styles.pillShadow, shadow]}>
        <View style={styles.pill}>
          <BlurView
            intensity={40}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.pillInner}>
            {state.routes.map((route, index) => {
              const tab = tabs[route.name];
              if (!tab) return null;
              const focused = state.index === index;
              return (
                <Animated.View
                  key={route.key}
                  layout={LinearTransition.duration(150)}
                >
                  <PressableScale
                    haptic
                    accessibilityRole="tab"
                    accessibilityLabel={tab.label}
                    accessibilityState={{ selected: focused }}
                    onPress={() => {
                      const event = emitter.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                      });
                      if (!focused && !event.defaultPrevented) {
                        navigateToTab(route.key);
                      }
                    }}
                    style={[styles.tab, focused && styles.tabActive]}
                  >
                    <Ionicons
                      name={focused ? tab.active : tab.icon}
                      size={22}
                      color={focused ? colors.onAccent : colors.textMuted}
                    />
                    {focused && (
                      <Animated.Text
                        entering={FadeIn.duration(150)}
                        style={[type.callout, styles.tabLabel]}
                      >
                        {tab.label}
                      </Animated.Text>
                    )}
                  </PressableScale>
                </Animated.View>
              );
            })}
          </View>
        </View>
      </View>

      <PressableScale
        haptic
        accessibilityLabel="Report an incident"
        onPress={() => router.push("/report-incident")}
        style={[styles.report, shadow]}
      >
        <Ionicons name="add" size={30} color={colors.onAlert} />
      </PressableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pillShadow: {
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceRaised,
  },
  pill: {
    height: 64,
    borderRadius: radius.pill,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  pillInner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
  },
  tab: {
    height: 48,
    minWidth: 52,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  tabActive: {
    backgroundColor: colors.accent,
    paddingHorizontal: 18,
  },
  tabLabel: {
    color: colors.onAccent,
    fontFamily: "Inter-SemiBold",
  },
  report: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.alert,
    alignItems: "center",
    justifyContent: "center",
  },
});
