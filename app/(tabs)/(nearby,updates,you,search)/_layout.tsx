import { color } from "@/theme/system";
import { Stack } from "expo-router";

// One stack shared by every tab, so an incident opens inside the tab it was
// tapped in, with the tab bar still showing, and long-press previews can
// expand into it. Each tab starts on its own screen.
export const unstable_settings = {
  nearby: { anchor: "index" },
  updates: { anchor: "updates" },
  you: { anchor: "you" },
  search: { anchor: "search" },
};

// Every tab's stack holds all four screens; each tab starts on its own
// (see the anchors above), and the others are only reachable by link.
const screens = [
  { name: "index", title: "Nearby" },
  { name: "updates", title: "Updates" },
  { name: "you", title: "You" },
  { name: "search", title: "Search" },
];

export default function TabStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal",
        contentStyle: { backgroundColor: color.background },
      }}
    >
      {screens.map(({ name, title }) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{
            title,
            headerLargeTitleEnabled: true,
            headerLargeTitleShadowVisible: false,
          }}
        />
      ))}
      <Stack.Screen name="incident/[id]" options={{ title: "" }} />
    </Stack>
  );
}
