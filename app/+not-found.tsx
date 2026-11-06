import { Link } from "expo-router";
import { colors, type } from "@/theme/tokens";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={[type.title, styles.text]} accessibilityRole="header">
        This screen doesn&apos;t exist.
      </Text>
      <Link
        href="/"
        style={[type.callout, styles.link]}
        accessibilityRole="link"
      >
        Go to the home screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.bg,
  },
  text: {
    color: colors.text,
  },
  link: {
    marginTop: 16,
    paddingVertical: 16,
    color: colors.accent,
  },
});
