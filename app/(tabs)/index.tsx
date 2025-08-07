import CustomSafeAreaView from "@/components/custom-safe-area-view";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const recentActivities = [
    {
      id: 1,
      type: "suspicious",
      title: "Suspicious vehicle parked on Elm...",
      reporter: "Sarah Chen",
      time: "2 hours ago",
      icon: "car" as const,
    },
    {
      id: 2,
      type: "meeting",
      title: "Community meeting scheduled for...",
      reporter: "Michael Davis",
      time: "4 hours ago",
      icon: "people" as const,
    },
    {
      id: 3,
      type: "theft",
      title: "Package theft reported on Oak...",
      reporter: "Emily Rodriguez",
      time: "6 hours ago",
      icon: "cube" as const,
    },
    {
      id: 24,
      type: "meeting",
      title: "Community meeting scheduled for...",
      reporter: "Michael Davis",
      time: "4 hours ago",
      icon: "people" as const,
    },
    {
      id: 32,
      type: "theft",
      title: "Package theft reported on Oak...",
      reporter: "Emily Rodriguez",
      time: "6 hours ago",
      icon: "cube" as const,
    },
    {
      id: 21,
      type: "meeting",
      title: "Community meeting scheduled for...",
      reporter: "Michael Davis",
      time: "4 hours ago",
      icon: "people" as const,
    },
    {
      id: 355,
      type: "theft",
      title: "Package theft reported on Oak...",
      reporter: "Emily Rodriguez",
      time: "6 hours ago",
      icon: "cube" as const,
    },
    {
      id: 234,
      type: "meeting",
      title: "Community meeting scheduled for...",
      reporter: "Michael Davis",
      time: "4 hours ago",
      icon: "people" as const,
    },
    {
      id: 332,
      type: "theft",
      title: "Package theft reported on Oak...",
      reporter: "Emily Rodriguez",
      time: "6 hours ago",
      icon: "cube" as const,
    },
  ];

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alarmit</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Link href="/(tabs)/profile">
            <Ionicons name="settings" size={24} color="#FFFFFF" />
          </Link>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#B0B8C4" />
          <Text style={styles.searchPlaceholder}>
            Search for incidents or alerts
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
    </View>
  );

  const renderActivity = ({ item }: { item: (typeof recentActivities)[0] }) => (
    <TouchableOpacity style={styles.activityItem}>
      <View style={styles.activityIcon}>
        <Ionicons name={item.icon} size={20} color="#1A2A44" />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        <Text style={styles.activityMeta}>Reported by {item.reporter}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <CustomSafeAreaView>
        <FlatList
          data={recentActivities}
          renderItem={renderActivity}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          style={styles.fab}
          onPress={() => console.log("Report incident")}
        >
          <Ionicons name="add" size={28} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.fabLabel}>
          <Text style={styles.fabLabelText}>Report Incident</Text>
        </View>
      </CustomSafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 100, // Space for the floating button
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Manrope-Bold",
    color: "#FFFFFF",
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
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
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Manrope-SemiBold",
    color: "#FFFFFF",
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 24,
    marginBottom: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  activityMeta: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabLabel: {
    position: "absolute",
    right: 24,
    bottom: 50,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  fabLabelText: {
    fontSize: 12,
    fontFamily: "Inter-SemiBold",
    color: "#FFFFFF",
  },
});
