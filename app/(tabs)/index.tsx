import CustomSafeAreaView from "@/components/custom-safe-area-view";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  const recentActivities = [
    {
      id: 1,
      type: "suspicious",
      title: "Suspicious activity reported near UNIPORT...",
      reporter: "Chioma Okwu",
      time: "2 hours ago",
      icon: "eye" as const,
    },
    {
      id: 2,
      type: "meeting",
      title: "Town hall meeting scheduled for...",
      reporter: "Emeka Nwosu",
      time: "4 hours ago",
      icon: "people" as const,
    },
    {
      id: 3,
      type: "theft",
      title: "Phone theft reported at Aluu Junction...",
      reporter: "Fatima Abdullahi",
      time: "6 hours ago",
      icon: "phone-portrait" as const,
    },
    {
      id: 4,
      type: "vandalism",
      title: "Vandalism at Choba Motor Park...",
      reporter: "Tunde Adebayo",
      time: "8 hours ago",
      icon: "hammer" as const,
    },
    {
      id: 5,
      type: "noise",
      title: "Noise complaint from Mgbuoba area...",
      reporter: "Grace Edet",
      time: "12 hours ago",
      icon: "volume-high" as const,
    },
    {
      id: 6,
      type: "safety",
      title: "Poor lighting reported on East-West Road...",
      reporter: "Ahmed Ibrahim",
      time: "1 day ago",
      icon: "bulb" as const,
    },
    {
      id: 7,
      type: "accident",
      title: "Minor accident at Eleme Junction...",
      reporter: "Blessing Okafor",
      time: "1 day ago",
      icon: "warning" as const,
    },
    {
      id: 8,
      type: "robbery",
      title: "Armed robbery attempt at Mile 1 Market...",
      reporter: "Kemi Alabi",
      time: "2 days ago",
      icon: "shield-half" as const,
    },
    {
      id: 9,
      type: "fire",
      title: "Small fire outbreak in Trans-Amadi...",
      reporter: "Victor Obi",
      time: "2 days ago",
      icon: "flame" as const,
    },
  ];

  const renderListHeader = () => (
    <View>
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
    <CustomSafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alarmit</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => router.push("/search")}
        >
          <Ionicons name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={recentActivities}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/report-incident")}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.fabLabel}>
        <Text style={styles.fabLabelText}>Report Incident</Text>
      </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
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
