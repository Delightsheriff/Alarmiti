import { SampleStoreProvider } from "@/data/store";
import { color } from "@/theme/system";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { LogBox, useColorScheme } from "react-native";

// Incident previews can't morph into the pushed screen because every tab shares
// one stack layout, so expo-router warns and falls back to a regular push.
LogBox.ignoreLogs(["No preloaded screen view to push"]);

export default function RootLayout() {
  // Header titles and back buttons take their colours from this theme.
  const scheme = useColorScheme();
  return (
    <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <SampleStoreProvider>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: color.background },
            headerBackButtonDisplayMode: "minimal",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="report"
            options={{ presentation: "modal", title: "New Report" }}
          />
          <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
        </Stack>
      </SampleStoreProvider>
    </ThemeProvider>
  );
}
