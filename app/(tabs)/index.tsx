import CustomSafeAreaView from "@/components/custom-safe-area-view";
import { formatClockTime } from "@/data/sample";
import { useSampleStore } from "@/data/store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { incidents } = useSampleStore();

  return (
    <CustomSafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerTitle} accessibilityRole="header">
          Alarmiti
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.feedContainer}>
          {incidents.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.feedItem}
              onPress={() =>
                router.push({
                  pathname: "/incident-details",
                  params: { id: item.id },
                })
              }
              accessibilityRole="button"
              accessibilityLabel={`${item.urgent ? "Urgent: " : ""}${
                item.title
              }, ${item.location}`}
              accessibilityHint="Opens the incident details"
            >
              {item.urgent && (
                <View style={styles.urgentBadge}>
                  <Text style={styles.urgentText}>Urgent</Text>
                </View>
              )}

              <View style={styles.feedContent}>
                <Text style={styles.feedTitle}>{item.title}</Text>
                <Text style={styles.feedDescription} numberOfLines={3}>
                  {item.description}
                </Text>

                <View style={styles.feedMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time" size={14} color="#B0B8C4" />
                    <Text style={styles.metaText}>
                      {formatClockTime(item.reportedAt)}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="location" size={14} color="#B0B8C4" />
                    <Text style={styles.metaText}>{item.location}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="person" size={14} color="#B0B8C4" />
                    <Text style={styles.metaText}>
                      Reported by {item.reporter}
                    </Text>
                  </View>
                </View>
              </View>

              {item.image && (
                <Image
                  source={item.image}
                  style={styles.feedImage}
                  contentFit="cover"
                  transition={200}
                  accessible={false}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/report-incident")}
        accessibilityRole="button"
        accessibilityLabel="Report incident"
      >
        <Ionicons name="add" size={28} color="#1A2A44" />
      </TouchableOpacity>

      <View
        style={styles.fabLabel}
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <Text style={styles.fabLabelText}>Report Incident</Text>
      </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
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
    alignSelf: "flex-start",
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
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

  fab: {
    position: "absolute",
    right: 24,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
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
    bottom: 60,
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
