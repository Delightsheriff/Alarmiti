// import { onboardingScreens } from "@/constants/onboardingData";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { router } from "expo-router";
// import React, { useEffect, useRef, useState } from "react";
// import { Image, Text, TouchableOpacity, View } from "react-native";
// import PagerView from "react-native-pager-view";

// const Onboarding = () => {
//   const pagerRef = useRef<PagerView>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [autoSliding, setAutoSliding] = useState(true);
//   const isLast = currentIndex === onboardingScreens.length - 1;

//   // Auto slide logic
//   useEffect(() => {
//     if (!autoSliding) return;

//     const timer = setInterval(() => {
//       if (!isLast) {
//         const next = currentIndex + 1;
//         pagerRef.current?.setPage(next);
//       }
//     }, 4000);

//     return () => clearInterval(timer);
//   }, [currentIndex, autoSliding, isLast]);

//   const handlePageChange = (e: any) => {
//     const newIndex = e.nativeEvent.position;
//     if (newIndex !== currentIndex) {
//       setAutoSliding(false); // stop auto sliding on manual swipe
//       setCurrentIndex(newIndex);
//     }
//   };

//   const handleSkip = async () => {
//     await AsyncStorage.setItem("hasSeenOnboarding", "true");
//     router.replace("/location");
//   };

//   return (
//     <View className="flex-1  bg-peace-secondary items-center justify-center">
//       <PagerView
//         ref={pagerRef}
//         style={{ flex: 1 }}
//         initialPage={0}
//         onPageSelected={handlePageChange}
//       >
//         {onboardingScreens.map((screen, index) => (
//           <View key={index} className="flex-1">
//             {/* Top image */}
//             <View className="flex-[0.4]">
//               <Image
//                 source={screen.image}
//                 className="w-full h-full"
//                 resizeMode="contain"
//               />
//             </View>

//             {/* Bottom */}
//             <View className="flex-[0.6] bg-peace-secondary px-8 pt-12 justify-between">
//               <View>
//                 <Text className="text-white text-3xl font-bold font-manrope text-center mb-8 leading-tight">
//                   {screen.title}
//                 </Text>
//               </View>

//               <View>
//                 {/* Skip */}
//                 {!isLast && (
//                   <TouchableOpacity className="mb-4" onPress={handleSkip}>
//                     <Text className="text-gray-400 text-center text-lg">
//                       Skip
//                     </Text>
//                   </TouchableOpacity>
//                 )}

//                 {/* Pagination Dots */}
//                 <View className="flex-row justify-center items-center mb-12">
//                   {onboardingScreens.map((_, i) => (
//                     <View
//                       key={i}
//                       className={`w-2 h-2 mx-1 rounded-full ${
//                         i === currentIndex ? "bg-white" : "bg-gray-600"
//                       }`}
//                     />
//                   ))}
//                 </View>

//                 {/* Get Started */}
//                 {isLast && (
//                   <TouchableOpacity
//                     className="bg-peace-secondary w-full py-4 px-8 rounded-lg mb-8"
//                     onPress={handleSkip}
//                   >
//                     <Text className="text-white text-center text-lg font-semibold">
//                       Get Started
//                     </Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>
//           </View>
//         ))}
//       </PagerView>
//     </View>
//   );
// };

// export default Onboarding;

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
    <View className="flex-1 bg-peace-secondary items-center justify-center">
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
              <View className="flex-[0.6] bg-peace-secondary px-8 pt-12 justify-between">
                <View>
                  <Text className="text-white text-3xl font-bold font-manrope text-center mb-8 leading-tight">
                    {screen.title}
                  </Text>
                </View>

                <View>
                  {/* Next/Get Started Button */}
                  <TouchableOpacity
                    className="bg-white w-full py-4 px-8 rounded-xl mb-8"
                    onPress={handleNext}
                  >
                    <Text className="text-peace-secondary text-center text-lg font-semibold">
                      {isLast ? "Get Started" : "Next"}
                    </Text>
                  </TouchableOpacity>

                  {/* Skip button - only show if not last */}
                  {!isLast && (
                    <TouchableOpacity onPress={handleSkip}>
                      <Text className="text-gray-400 text-center text-base">
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
