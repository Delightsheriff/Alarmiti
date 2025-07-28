import { Link } from "expo-router";
import { Text, View } from "react-native";
import "./global.css";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-peace-background">
      <Text
        className="text-xl font-manrope 
        text-peace-text  rounded-squircle-md p-5 bg-peace-secondary"
      >
        Welcome to the Neighbourhood app
      </Text>
      <Link href="/onboarding" className="text-peace-text text-lg mt-5">
        Go to Onboarding
      </Link>
    </View>
  );
}
