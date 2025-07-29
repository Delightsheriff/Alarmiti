import { onboardingScreens } from "@/constants/onboardingData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Onboarding = () => {
  const carouselRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSliding, setAutoSliding] = useState(true);
  const isLast = currentIndex === onboardingScreens.length - 1;

  useEffect(() => {
    if (!autoSliding) return;

    const timer = setInterval(() => {
      if (!isLast) {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [autoSliding, isLast]);

  const handleSkip = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    router.replace("/location");
  };

  const handleNext = async () => {
    if (isLast) {
      // Get Started - complete onboarding
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      router.replace("/location");
    } else {
      // Go to next slide
      setAutoSliding(false);
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      carouselRef.current?.scrollTo({ index: nextIndex });
    }
  };

  return (
    <View className="flex-1 bg-peace-background items-center justify-center">
      <Carousel
        ref={carouselRef}
        loop={false}
        width={screenWidth}
        height={screenHeight}
        autoPlay={autoSliding}
        autoPlayInterval={4000}
        data={onboardingScreens}
        scrollAnimationDuration={600}
        onSnapToItem={(index) => {
          setAutoSliding(false);
          setCurrentIndex(index);
        }}
        renderItem={({ index }) => {
          const screen = onboardingScreens[index];
          return (
            <View className="flex-1">
              {/* Top image */}
              <View className="flex-[0.4]">
                <Image
                  source={screen.image}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Bottom */}
              <View className="flex-[0.6] bg-peace-secondary px-8 pt-12 justify-between border-t border-peace-border">
                <View>
                  <Text className="text-white text-3xl font-bold font-manrope text-center mb-8 leading-tight">
                    {screen.title}
                  </Text>
                </View>

                <View>
                  {/* Next/Get Started Button */}
                  <TouchableOpacity
                    className="bg-accent-blue hover:bg-accent-purple w-full py-4 px-8 rounded-xl mb-8 shadow-lg"
                    onPress={handleNext}
                  >
                    <Text className="text-white text-center text-lg font-semibold">
                      {isLast ? "Get Started" : "Next"}
                    </Text>
                  </TouchableOpacity>

                  {/* Skip button - only show if not last */}
                  {!isLast && (
                    <TouchableOpacity onPress={handleSkip}>
                      <Text className="text-peace-subtle text-center text-base mb-5">
                        Skip
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Onboarding;
