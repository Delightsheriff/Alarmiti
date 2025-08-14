import { QueryProvider } from "@/providers/query-provider";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold,
  useFonts,
} from "@expo-google-fonts/manrope";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Manrope-Regular": Manrope_400Regular,
    "Manrope-SemiBold": Manrope_600SemiBold,
    "Manrope-Bold": Manrope_700Bold,
    "Inter-Regular": Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
    "Inter-SemiBold": Inter_600SemiBold,
  });
  // TODO: REMOVE THIS LATER
  // Clear AsyncStorage for testing purposes
  useEffect(() => {
    const clearStorageForTesting = async () => {
      try {
        await AsyncStorage.removeItem("hasCompletedOnboarding");
        await AsyncStorage.removeItem("userLoation");
        console.log("AsyncStorage cleared for testing");
      } catch (error) {
        console.error("Error clearing AsyncStorage:", error);
      }
    };

    // Uncomment the line below to clear storage on component mount
    clearStorageForTesting();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Toast />
      <QueryProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="location" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </QueryProvider>
    </>
  );
}
