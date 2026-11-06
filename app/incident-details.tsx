import CustomSafeAreaView from "@/components/custom-safe-area-view";
import { categories, formatClockTime, formatRelativeTime } from "@/data/sample";
import { useIncident } from "@/data/store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function IncidentDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const incident = useIncident(id);

  return (
    <CustomSafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} accessibilityRole="header">
          Incident Details
        </Text>
        <View style={styles.placeholder} />
      </View>

      {!incident ? (
        <View style={styles.missing}>
          <Ionicons name="document-text-outline" size={48} color="#B0B8C4" />
          <Text style={styles.missingText}>This incident isn&apos;t available.</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.locationSection}>
              <Text style={styles.sectionTitle}>Location</Text>
              <View style={styles.mapContainer}>
                <View style={styles.mapPlaceholder}>
                  <Ionicons name="location" size={32} color="#B0B8C4" />
                  <Text style={styles.mapText}>{incident.location}</Text>
                </View>
              </View>
            </View>

            <View style={styles.incidentSection}>
              <Text style={styles.sectionTitle}>Incident</Text>
              <View style={styles.incidentCard}>
                <View style={styles.categoryPill}>
                  <Ionicons
                    name={categories[incident.category].icon}
                    size={14}
                    color="#1A2A44"
                  />
                  <Text style={styles.categoryText}>
                    {categories[incident.category].label}
                  </Text>
                </View>
                <Text style={styles.incidentTitle}>{incident.title}</Text>
                <View style={styles.incidentMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time" size={16} color="#B0B8C4" />
                    <Text style={styles.metaText}>
                      {formatClockTime(incident.reportedAt)} ·{" "}
                      {formatRelativeTime(incident.reportedAt)}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="person" size={16} color="#B0B8C4" />
                    <Text style={styles.metaText}>
                      Reported by {incident.reporter}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <View style={styles.descriptionCard}>
                <Text style={styles.descriptionText}>
                  {incident.description}
                </Text>
              </View>
            </View>

            {incident.image && (
              <View style={styles.mediaSection}>
                <Text style={styles.sectionTitle}>Media</Text>
                <Image
                  source={{ uri: incident.image }}
                  style={styles.mediaImage}
                  contentFit="cover"
                  transition={200}
                  accessibilityLabel={`Photo attached to ${incident.title}`}
                />
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Manrope-SemiBold",
    color: "#FFFFFF",
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  locationSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Manrope-SemiBold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  mapContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    overflow: "hidden",
  },
  mapPlaceholder: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(176, 184, 196, 0.1)",
  },
  mapText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#B0B8C4",
    marginTop: 8,
  },
  incidentSection: {
    marginBottom: 32,
  },
  incidentCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: "Inter-SemiBold",
    color: "#1A2A44",
  },
  incidentTitle: {
    fontSize: 20,
    fontFamily: "Manrope-SemiBold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  incidentMeta: {
    gap: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
  },
  descriptionSection: {
    marginBottom: 32,
  },
  descriptionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    lineHeight: 24,
  },
  mediaSection: {
    marginBottom: 32,
  },
  mediaImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  missing: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 24,
  },
  missingText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#B0B8C4",
  },
});
