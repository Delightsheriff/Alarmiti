import { useAuth } from "@/providers/auth-provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function InitialScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { session, mounting } = useAuth();

  useEffect(() => {
    const checkUserStatus = async () => {
      if (mounting) return; // wait for auth state to resolve

      try {
        const hasCompletedOnboarding = await AsyncStorage.getItem(
          "hasCompletedOnboarding"
        );

        if (!hasCompletedOnboarding) {
          router.replace("/onboarding");
        } else if (!session) {
          router.replace("/auth");
        } else {
          router.replace("/(tabs)");
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        router.replace("/onboarding");
      } finally {
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, [mounting, session, router]);

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
