import CustomSafeAreaView from "@/components/custom-safe-area-view";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const Search = () => {
  return (
    <CustomSafeAreaView>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#B0B8C4" />
          <Text style={styles.searchPlaceholder}>
            Search for incidents or alerts in your area
          </Text>
        </View>
      </View>
    </CustomSafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  searchPlaceholder: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
    marginLeft: 12,
  },
});
