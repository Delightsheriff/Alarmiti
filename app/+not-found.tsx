import { images } from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const NotFound = () => {
  const handleGoHome = () => {
    router.replace("/");
  };

  return (
    <View className="flex-1 bg-peace-background">
      {/* Image Container */}
      <View className="flex-[0.5] justify-center items-center px-8">
        <Image
          source={images.notFound}
          className="w-full h-64"
          resizeMode="contain"
        />
      </View>

      {/* Content Container */}
      <View className="flex-[0.5] px-8 justify-center">
        <View className="items-center">
          <Text className="text-peace-text text-3xl font-bold font-manrope text-center mb-4 leading-tight">
            Page Not Found
          </Text>

          <Text className="text-peace-container text-lg text-center mb-12 leading-relaxed px-4">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
            Let&apos;s get you back on track.
          </Text>

          {/* Go Home Button */}
          <TouchableOpacity
            className="bg-accent-blue hover:bg-accent-purple w-full py-4 px-8 rounded-squircle-md shadow-lg"
            onPress={handleGoHome}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Go Home
            </Text>
          </TouchableOpacity>

          {/* Secondary Action */}
          <TouchableOpacity className="mt-4 py-2" onPress={() => router.back()}>
            <Text className="text-peace-subtle text-center text-base">
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NotFound;
