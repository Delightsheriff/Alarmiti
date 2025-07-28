import { Inter_900Black } from "@expo-google-fonts/inter";
import { Manrope_400Regular as manrope } from "@expo-google-fonts/manrope";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "./global.css";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_900Black,
    manrope,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <Stack />;
}
