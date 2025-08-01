import {
  AwarenessIcon,
  CommunityIcon,
  ReportingIcon,
} from "@/components/OnboardingIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: 1,
    icon: CommunityIcon,
    headline: "Stay connected to your neighborhood.",
  },
  {
    id: 2,
    icon: AwarenessIcon,
    headline: "Get alerts about incidents nearby.",
  },
  {
    id: 3,
    icon: ReportingIcon,
    headline: "Report problems with just a few taps.",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Clear AsyncStorage for testing purposes
  useEffect(() => {
    const clearStorageForTesting = async () => {
      try {
        await AsyncStorage.removeItem("hasCompletedOnboarding");
        console.log("AsyncStorage cleared for testing");
      } catch (error) {
        console.error("Error clearing AsyncStorage:", error);
      }
    };

    // Uncomment the line below to clear storage on component mount
    clearStorageForTesting();
  }, []);

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
      router.replace("/location");
    } catch (error) {
      console.error("Error saving onboarding status:", error);
    }
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
      router.replace("/auth");
    } catch (error) {
      console.error("Error saving onboarding status:", error);
    }
  };

  const onScrollEnd = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slide);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <View style={styles.iconContainer}>
              <slide.icon />
            </View>
            <Text style={styles.headline}>{slide.headline}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomSection}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentSlide ? "#FFFFFF" : "#B0B8C4",
                },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleGetStarted}
          style={styles.getStartedButton}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A2A44",
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    fontSize: 28,
    fontFamily: "Manrope-SemiBold",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 36,
    paddingHorizontal: 20,
  },
  bottomSection: {
    paddingHorizontal: 40,
    paddingBottom: 60,
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  skipButton: {
    marginBottom: 20,
    paddingVertical: 12,
  },
  skipText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#B0B8C4",
  },
  getStartedButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedText: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#1A2A44",
  },
});
