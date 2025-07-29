import { images } from "@/constants/images";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const Location = () => {
  return (
    <View className="flex-1 bg-peace-background">
      {/* Header Text Section */}
      <View className="items-center px-8 pt-16 pb-8">
        <Text className="text-white text-3xl font-bold font-manrope text-center leading-tight mb-4">
          Enable Location Access
        </Text>
        <Text className="text-white text-base font-manrope text-center leading-tight">
          To show alerts near you, we need your location or area
        </Text>
      </View>

      {/* Image Section - Full Width */}
      <View className="flex-1 px-0">
        <Image
          source={images.location}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      {/* Bottom Input Section */}
      <View className="px-8 pb-8 pt-4">
        <TouchableOpacity className="bg-peace-secondary w-full py-4 px-8 rounded-lg mb-4">
          <Text className="text-white text-center text-lg font-semibold">
            Use my location
          </Text>
        </TouchableOpacity>

        <Text className="text-center text-peace-text font-manrope mb-4">
          OR
        </Text>

        <TextInput
          placeholder="Enter your neighbourhood or area"
          placeholderTextColor="#9CA3AF"
          className="bg-peace-secondary w-full py-4 px-8 rounded-lg text-white"
        />
      </View>
    </View>
  );
};

export default Location;
