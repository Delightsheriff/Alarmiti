import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";

const { height: screenHeight } = Dimensions.get("window");

const Auth = () => {
  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign-In logic
    console.log("Google Sign-In pressed");
  };

  return (
    <View className="flex-1 bg-peace-background">
      <StatusBar style="light" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: screenHeight }}
      >
        {/* Header Section */}
        <View className="pt-20 pb-8 px-6 flex-1 justify-center">
          {/* App Branding */}
          <View className="items-center mb-12">
            <Text className="text-5xl font-manrope font-bold text-peace-text mb-3">
              Alarmiti
            </Text>
            <Text className="text-lg font-manrope text-peace-subtle text-center px-4">
              Your Neighborhood Safety Network
            </Text>
          </View>

          {/* Welcome Message */}
          <View className="bg-peace-secondary border border-peace-border rounded-squircle-lg p-6 mb-8">
            <Text className="text-2xl font-manrope font-semibold text-peace-text mb-3 text-center">
              Welcome Back
            </Text>
            <Text className="text-base font-manrope text-peace-subtle leading-6 text-center">
              Sign in to stay connected with your community and help keep your
              neighborhood safe.
            </Text>
          </View>

          {/* Sign In Options */}
          <View className="mb-8">
            {/* Google Sign In Button */}
            <Pressable
              className="bg-white hover:bg-gray-50 rounded-squircle-md p-4 active:opacity-80 shadow-lg border border-peace-border"
              onPress={handleGoogleSignIn}
            >
              <View className="flex-row items-center justify-center">
                <View className="w-6 h-6 mr-3">
                  {/* Google Icon Placeholder */}
                  <View className="w-6 h-6 bg-accent-blue rounded-full items-center justify-center">
                    <Text className="text-white text-xs font-bold">G</Text>
                  </View>
                </View>
                <Text className="text-gray-800 font-manrope font-semibold text-lg">
                  Continue with Google
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Auth;
