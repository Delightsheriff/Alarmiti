import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FeedScreen() {
  const router = useRouter();

  const feedItems = [
    {
      id: 1,
      type: "urgent",
      title: "Armed Robbery Alert",
      description:
        "Armed robbers attacked commuters along Aba Road near Mile 3 Junction. Three motorcycles involved, carrying weapons. Please avoid the area and use alternative routes.",
      image:
        "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=400",
      time: "16:30 PM",
      reporter: "Chika Okafor",
    },
    {
      id: 2,
      title: "Community Security Meeting",
      description:
        "Town Union security meeting tomorrow at 6 PM at GRA Community Hall. Discussing recent security challenges and establishing vigilante patrols.",
      image:
        "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400",
      time: "14:15 PM",
      reporter: "GRA Residents Association",
    },
    {
      id: 3,
      title: "Pipeline Vandalism Warning",
      description:
        "Suspected pipeline vandalism activities reported in Rumuokoro area. NSCDC has been alerted. Residents should stay vigilant and report suspicious movements.",
      image:
        "https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=400",
      time: "12:45 PM",
      reporter: "Emeka Nwachukwu",
    },
    {
      id: 4,
      title: "Missing Child Found",
      description:
        "7-year-old Blessing found safe near Mile 1 Market. She was lost for 3 hours. Thanks to all who helped in the search. Family is grateful.",
      image:
        "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
      time: "10:20 AM",
      reporter: "Adaeze Okoro",
    },
    {
      id: 5,
      title: "Cultist Activity Alert",
      description:
        "Suspected cultist gathering reported in Diobu area last night. Residents heard gunshots around 2 AM. Police have been notified and patrols increased.",
      image:
        "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=400",
      time: "08:30 AM",
      reporter: "Ikenna Eze",
    },
    {
      id: 6,
      title: "Kidnapping Attempt Foiled",
      description:
        "Quick action by local vigilante prevented kidnapping attempt on Eleme Junction Road. Three suspects arrested. Vehicle recovered with fake number plates.",
      image:
        "https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=400",
      time: "06:15 AM",
      reporter: "Port Harcourt Vigilante",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alarmit</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/report-incident")}
        >
          <Ionicons name="add" size={24} color="#1A2A44" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.feedContainer}>
          {feedItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.feedItem}
              onPress={() => router.push("/incident-details")}
            >
              {item.type === "urgent" && (
                <View style={styles.urgentBadge}>
                  <Text style={styles.urgentText}>Urgent</Text>
                </View>
              )}

              <View style={styles.feedContent}>
                <Text style={styles.feedTitle}>{item.title}</Text>
                <Text style={styles.feedDescription}>{item.description}</Text>

                <View style={styles.feedMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time" size={14} color="#B0B8C4" />
                    <Text style={styles.metaText}>{item.time}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="person" size={14} color="#B0B8C4" />
                    <Text style={styles.metaText}>
                      Reported by {item.reporter}
                    </Text>
                  </View>
                </View>
              </View>

              <Image source={{ uri: item.image }} style={styles.feedImage} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A2A44",
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  feedContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
    gap: 16,
  },
  feedItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    position: "relative",
  },
  urgentBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 1,
  },
  urgentText: {
    fontSize: 12,
    fontFamily: "Inter-SemiBold",
    color: "#FFFFFF",
  },
  feedContent: {
    marginBottom: 12,
  },
  feedTitle: {
    fontSize: 18,
    fontFamily: "Manrope-SemiBold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  feedDescription: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
    lineHeight: 20,
    marginBottom: 12,
  },
  feedMeta: {
    gap: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
  },
  feedImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});
