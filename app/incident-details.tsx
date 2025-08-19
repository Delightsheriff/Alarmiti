import CustomSafeAreaView from "@/components/custom-safe-area-view";
import { useAuth } from "@/providers/auth-provider";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function IncidentDetailsScreen() {
  const router = useRouter();
  const { session, mounting } = useAuth();

  if (mounting) return null;
  if (!session) return <Redirect href="/auth" />;

  return (
    <CustomSafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Incident Details</Text>
        <View style={styles.placeholder} />
      </View>

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
                <Text style={styles.mapText}>Map View</Text>
              </View>
            </View>
          </View>

          <View style={styles.incidentSection}>
            <Text style={styles.sectionTitle}>Incident</Text>
            <View style={styles.incidentCard}>
              <Text style={styles.incidentTitle}>Suspicious Activity</Text>
              <View style={styles.incidentMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="time" size={16} color="#B0B8C4" />
                  <Text style={styles.metaText}>16:30 AM</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="person" size={16} color="#B0B8C4" />
                  <Text style={styles.metaText}>Reported by Sarah Miller</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <View style={styles.descriptionCard}>
              <Text style={styles.descriptionText}>
                Observed an individual attempting to open car doors on Elm
                Street. The person was wearing a dark hoodie and jeans. Please
                be vigilant and ensure your vehicles are locked.
              </Text>
            </View>
          </View>

          <View style={styles.mediaSection}>
            <Text style={styles.sectionTitle}>Media</Text>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/1756957/pexels-photo-1756957.jpeg?auto=compress&cs=tinysrgb&w=800",
              }}
              style={styles.mediaImage}
            />
          </View>
        </View>
      </ScrollView>
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
});
