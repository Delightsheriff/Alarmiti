import { images } from "@/constants/images";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "./global.css";

const { height: screenHeight } = Dimensions.get("window");

const Location = () => {
  const [locationText, setLocationText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const textInputRef = useRef<TextInput>(null);

  const handleUseMyLocation = () => {
    // TODO: Implement location permission request and get current location
    Alert.alert("Location Access", "Location feature will be implemented here");
    // For now, navigate to next screen
    // router.replace("/"); // Navigate to main app
  };

  const handleLocationSubmit = () => {
    if (locationText.trim()) {
      // TODO: Validate and save the entered location
      console.log("Location entered:", locationText);
      router.replace("/auth"); // Navigate to auth page
    } else {
      Alert.alert("Error", "Please enter your location");
    }
  };

  const handleTextInputFocus = () => {
    // Scroll to the bottom when input is focused
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View className="flex-1 bg-peace-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            minHeight: screenHeight,
            paddingBottom: Platform.OS === "ios" ? 0 : 20,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Header Text Section */}
          <View className="items-center px-8 pt-20 pb-8">
            <Text className="text-peace-text text-3xl font-bold text-center leading-9 mb-4 font-manrope">
              Enable Location Access
            </Text>
            <Text className="text-peace-subtle text-lg text-center leading-7 px-4 font-manrope">
              To show alerts near you, we need your location or area
            </Text>
          </View>

          {/* Image Section - Flexible height */}
          <View className="flex-1 justify-center items-center px-8 min-h-48 max-h-72">
            <Image
              source={images.location}
              style={{ width: 280, height: 280 }}
              resizeMode="contain"
            />
          </View>

          {/* Bottom Input Section - Fixed at bottom */}
          <View className="px-8 pb-8 pt-4">
            {/* Use My Location Button */}
            <TouchableOpacity
              className="bg-accent-blue w-full py-4 px-8 rounded-squircle-md mb-6 shadow-lg active:opacity-80"
              onPress={handleUseMyLocation}
            >
              <Text className="text-white text-center text-lg font-semibold font-manrope">
                Use My Location
              </Text>
            </TouchableOpacity>

            {/* OR Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-peace-border" />
              <Text className="text-peace-subtle text-center mx-4 text-base font-manrope">
                OR
              </Text>
              <View className="flex-1 h-px bg-peace-border" />
            </View>

            {/* Location Input */}
            <View className="mb-6">
              <TextInput
                ref={textInputRef}
                value={locationText}
                onChangeText={setLocationText}
                onFocus={handleTextInputFocus}
                placeholder="Enter your neighbourhood or area"
                placeholderTextColor="#64748B"
                className="bg-peace-accent w-full py-4 px-6 rounded-squircle-md text-peace-text text-base border border-peace-border"
                returnKeyType="done"
                autoCorrect={false}
                autoCapitalize="words"
                blurOnSubmit={true}
              />
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              className={`w-full py-4 px-8 rounded-squircle-md shadow-lg active:opacity-80 ${
                locationText.trim() ? "bg-resolved-sage" : "bg-peace-border"
              }`}
              onPress={handleLocationSubmit}
              disabled={!locationText.trim()}
            >
              <Text
                className={`text-center text-lg font-semibold font-manrope ${
                  locationText.trim() ? "text-white" : "text-peace-subtle"
                }`}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Location;
