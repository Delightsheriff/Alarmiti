import { Section, Row } from "@/components/list";
import { router } from "expo-router";
import { ScrollView } from "react-native";

export default function NotFoundScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Section footer="This screen doesn't exist.">
        <Row title="Go to Nearby" accessory="chevron" onPress={() => router.replace("/")} />
      </Section>
    </ScrollView>
  );
}
