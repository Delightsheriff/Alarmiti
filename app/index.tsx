import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, View } from "react-native";
import "./global.css";

export default function App() {
  return (
    <View className="flex-1 bg-peace-background">
      <StatusBar style="light" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="pt-16 pb-8 px-6">
          <View className="items-center mb-8">
            <Text className="text-4xl font-manrope font-bold text-peace-text mb-2">
              Alarmiti
            </Text>
            <Text className="text-lg font-manrope text-peace-subtle text-center">
              Your Neighborhood Safety Network
            </Text>
          </View>

          {/* Welcome Card */}
          <View className="bg-peace-secondary rounded-squircle-lg p-6 mb-6 border border-peace-border animate-calm-pulse">
            <Text className="text-2xl font-manrope font-semibold text-peace-text mb-3">
              Welcome Home
            </Text>
            <Text className="text-base font-manrope text-peace-subtle leading-6">
              Stay connected with your community and help keep your neighborhood
              safe together.
            </Text>
          </View>

          {/* Quick Actions */}
          <View className="mb-8">
            <Text className="text-xl font-manrope font-semibold text-peace-text mb-4">
              Quick Actions
            </Text>

            <View className="space-y-3">
              {/* Report Alert Button */}
              <Pressable className="bg-awareness-amber hover:bg-awareness-dark rounded-squircle-md p-4 active:opacity-80 shadow-lg">
                <View className="flex-row items-center">
                  <View className="bg-white bg-opacity-20 rounded-full w-10 h-10 items-center justify-center mr-4">
                    <Text className="text-white text-lg font-bold">!</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-manrope font-semibold text-lg">
                      Report Alert
                    </Text>
                    <Text className="text-white text-opacity-90 font-manrope">
                      Quickly notify your neighbors
                    </Text>
                  </View>
                </View>
              </Pressable>

              {/* View Community Button */}
              <Pressable className="bg-resolved-sage hover:bg-resolved-dark rounded-squircle-md p-4 active:opacity-80 shadow-lg">
                <View className="flex-row items-center">
                  <View className="bg-white bg-opacity-20 rounded-full w-10 h-10 items-center justify-center mr-4">
                    <Text className="text-white text-lg font-bold">👥</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-manrope font-semibold text-lg">
                      View Community
                    </Text>
                    <Text className="text-white text-opacity-90 font-manrope">
                      See what&apos;s happening nearby
                    </Text>
                  </View>
                </View>
              </Pressable>

              {/* Settings Button */}
              <Pressable className="bg-peace-accent border border-peace-border rounded-squircle-md p-4 active:opacity-80">
                <View className="flex-row items-center">
                  <View className="bg-peace-subtle bg-opacity-20 rounded-full w-10 h-10 items-center justify-center mr-4">
                    <Text className="text-peace-text text-lg font-bold">
                      ⚙️
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-peace-text font-manrope font-semibold text-lg">
                      Settings
                    </Text>
                    <Text className="text-peace-subtle font-manrope">
                      Manage your preferences
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Stats Section */}
          <View className="bg-peace-secondary border border-peace-border rounded-squircle-lg p-6 mb-6">
            <Text className="text-xl font-manrope font-semibold text-peace-text mb-4">
              Community Stats
            </Text>

            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <Text className="text-2xl font-manrope font-bold text-accent-blue">
                  42
                </Text>
                <Text className="text-peace-subtle font-manrope text-center">
                  Active Members
                </Text>
              </View>

              <View className="items-center flex-1">
                <Text className="text-2xl font-manrope font-bold text-resolved-sage">
                  18
                </Text>
                <Text className="text-peace-subtle font-manrope text-center">
                  Resolved Alerts
                </Text>
              </View>

              <View className="items-center flex-1">
                <Text className="text-2xl font-manrope font-bold text-awareness-amber">
                  7
                </Text>
                <Text className="text-peace-subtle font-manrope text-center">
                  Days Safe
                </Text>
              </View>
            </View>
          </View>

          {/* Get Started Section */}
          <View className="items-center">
            <Text className="text-lg font-manrope text-peace-subtle mb-4 text-center">
              New to Alarmiti?
            </Text>

            <Link href="/onboarding" asChild>
              <Pressable className="bg-accent-blue hover:bg-accent-purple rounded-squircle-btn px-8 py-4 active:opacity-90 shadow-lg">
                <Text className="text-white font-manrope font-semibold text-lg">
                  Get Started
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
