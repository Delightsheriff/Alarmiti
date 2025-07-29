import { images } from "@/constants/images";
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
      // router.replace("/"); // Navigate to main app
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
    <View style={{ flex: 1, backgroundColor: "#1a1a2e" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
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
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: 32,
              paddingTop: 80,
              paddingBottom: 32,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 28,
                fontWeight: "bold",
                textAlign: "center",
                lineHeight: 36,
                marginBottom: 16,
              }}
            >
              Enable Location Access
            </Text>
            <Text
              style={{
                color: "#d1d5db",
                fontSize: 18,
                textAlign: "center",
                lineHeight: 28,
                paddingHorizontal: 16,
              }}
            >
              To show alerts near you, we need your location or area
            </Text>
          </View>

          {/* Image Section - Flexible height */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 32,
              minHeight: 200,
              maxHeight: 300,
            }}
          >
            <Image
              source={images.location}
              style={{ width: 280, height: 280 }}
              resizeMode="contain"
            />
          </View>

          {/* Bottom Input Section - Fixed at bottom */}
          <View
            style={{
              paddingHorizontal: 32,
              paddingBottom: 32,
              paddingTop: 16,
            }}
          >
            {/* Use My Location Button */}
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                width: "100%",
                paddingVertical: 16,
                paddingHorizontal: 32,
                borderRadius: 12,
                marginBottom: 24,
              }}
              onPress={handleUseMyLocation}
            >
              <Text
                style={{
                  color: "#1a1a2e",
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                Use My Location
              </Text>
            </TouchableOpacity>

            {/* OR Divider */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <View
                style={{ flex: 1, height: 1, backgroundColor: "#4b5563" }}
              />
              <Text
                style={{
                  color: "#9ca3af",
                  textAlign: "center",
                  marginHorizontal: 16,
                  fontSize: 16,
                }}
              >
                OR
              </Text>
              <View
                style={{ flex: 1, height: 1, backgroundColor: "#4b5563" }}
              />
            </View>

            {/* Location Input */}
            <View style={{ marginBottom: 24 }}>
              <TextInput
                ref={textInputRef}
                value={locationText}
                onChangeText={setLocationText}
                onFocus={handleTextInputFocus}
                placeholder="Enter your neighbourhood or area"
                placeholderTextColor="#9CA3AF"
                style={{
                  backgroundColor: "#374151",
                  width: "100%",
                  paddingVertical: 16,
                  paddingHorizontal: 24,
                  borderRadius: 12,
                  color: "white",
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: "#4b5563",
                }}
                returnKeyType="done"
                autoCorrect={false}
                autoCapitalize="words"
                blurOnSubmit={true}
              />
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              style={{
                width: "100%",
                paddingVertical: 16,
                paddingHorizontal: 32,
                borderRadius: 12,
                backgroundColor: locationText.trim() ? "#10b981" : "#4b5563",
              }}
              onPress={handleLocationSubmit}
              disabled={!locationText.trim()}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "600",
                  color: locationText.trim() ? "white" : "#9ca3af",
                }}
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
