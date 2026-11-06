import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text} accessibilityRole="header">
        This screen doesn&apos;t exist.
      </Text>
      <Link href="/" style={styles.link} accessibilityRole="link">
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
    backgroundColor: "#1A2A44",
  },
  text: {
    fontSize: 20,
    fontFamily: "Manrope-SemiBold",
    color: "#FFFFFF",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#B0B8C4",
  },
});
