import { Inter_900Black } from "@expo-google-fonts/inter";
import { Manrope_400Regular as manrope } from "@expo-google-fonts/manrope";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "./global.css";

SplashScreen.preventAutoHideAsync(); // lock splash until ready

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
    manrope,
  });

  const [onboardingChecked, setOnboardingChecked] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  //TODO: Remove this effect in production
  // This is just to reset the onboarding state for development
  // so we can see the onboarding flow again
  // Remove this before deploying
  // useEffect(() => {
  //   AsyncStorage.removeItem("hasSeenOnboarding");
  // }, []);

  useEffect(() => {
    const checkOnboarding = async () => {
      const seen = await AsyncStorage.getItem("hasSeenOnboarding");
      setShowOnboarding(!seen);
      setOnboardingChecked(true);
    };
    checkOnboarding();
  }, []);

  useEffect(() => {
    if ((fontsLoaded || fontError) && onboardingChecked) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, onboardingChecked]);

  if (!fontsLoaded && !fontError) return null;
  if (!onboardingChecked) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {showOnboarding ? (
        <Stack.Screen name="onboarding" />
      ) : (
        // <Stack.Screen name="(tabs)" />
        <Stack.Screen name="home" />
      )}
    </Stack>
  );
}
