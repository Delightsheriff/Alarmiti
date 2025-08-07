import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const Feed = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1A2A44" }}>
      <View style={styles.text}>
        <Text style={styles.p}>Feeds Page</Text>
      </View>
    </SafeAreaView>
  );
};

export default Feed;

const styles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
    fontSize: 20,
  },
  p: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Inter-Medium",
  },
});
