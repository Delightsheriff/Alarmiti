import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function InitialScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      // Check if user has completed onboarding
      const hasCompletedOnboarding = await AsyncStorage.getItem(
        "hasCompletedOnboarding"
      );

      // Check if user is authenticated (we'll implement this later)
      const isAuthenticated = await AsyncStorage.getItem("isAuthenticated");

      if (!hasCompletedOnboarding) {
        router.replace("/onboarding");
      } else if (!isAuthenticated) {
        router.replace("/auth");
      } else {
        // User is authenticated, go to main app (we'll add this later)
        router.replace("/auth"); // For now, redirect to auth
      }
    } catch (error) {
      console.error("Error checking user status:", error);
      router.replace("/onboarding");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <View style={styles.container} />;
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A2A44",
  },
});
