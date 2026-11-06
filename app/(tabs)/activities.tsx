import CustomSafeAreaView from "@/components/custom-safe-area-view";
import { Ionicons } from "@expo/vector-icons";
import { categories, formatRelativeTime, Incident } from "@/data/sample";
import { useSampleStore } from "@/data/store";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ActivityScreen() {
  const router = useRouter();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { incidents } = useSampleStore();

  const query = searchQuery.trim().toLowerCase();
  const filteredActivities = incidents.filter((incident) =>
    [
      incident.title,
      incident.reporter,
      incident.location,
      categories[incident.category].label,
    ].some((field) => field.toLowerCase().includes(query))
  );

  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  const handleSearchBlur = () => {
    if (searchQuery === "") {
      setIsSearchActive(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchActive(false);
  };

  const openSearch = () => {
    setIsSearchActive(true);
  };

  const renderListHeader = () => (
    <View>
      {isSearchActive && (
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#B0B8C4" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search activities..."
              placeholderTextColor="#B0B8C4"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
              accessibilityLabel="Search activities"
            />
            <TouchableOpacity
              onPress={clearSearch}
              style={styles.clearButton}
              accessibilityRole="button"
              accessibilityLabel="Close search"
            >
              <Ionicons name="close-circle" size={20} color="#B0B8C4" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {isSearchActive && searchQuery !== "" && (
        <Text style={styles.searchResultsText}>
          {filteredActivities.length} result
          {filteredActivities.length !== 1 ? "s" : ""} for &quot;{searchQuery}
          &quot;
        </Text>
      )}

      {!isSearchActive && (
        <Text style={styles.sectionTitle}>Recent Activity</Text>
      )}
    </View>
  );

  const renderEmptySearch = () => (
    <View style={styles.emptySearchState}>
      {searchQuery === "" ? (
        <>
          <Ionicons name="search" size={48} color="#B0B8C4" />
          <Text style={styles.emptySearchTitle}>Search Activities</Text>
          <Text style={styles.emptySearchDescription}>
            Find specific activities, reports, or incidents
          </Text>
        </>
      ) : (
        <>
          <Ionicons name="document-text-outline" size={48} color="#B0B8C4" />
          <Text style={styles.emptySearchTitle}>No results found</Text>
          <Text style={styles.emptySearchDescription}>
            Try searching with different keywords
          </Text>
        </>
      )}
    </View>
  );

  const renderActivity = ({ item }: { item: Incident }) => (
    <TouchableOpacity
      style={styles.activityItem}
      onPress={() =>
        router.push({ pathname: "/incident-details", params: { id: item.id } })
      }
      accessibilityRole="button"
      accessibilityLabel={`${categories[item.category].label}: ${item.title}`}
      accessibilityHint="Opens the incident details"
    >
      <View style={styles.activityIcon}>
        <Ionicons
          name={categories[item.category].icon}
          size={20}
          color="#1A2A44"
        />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.activityMeta}>
          {item.reporter} · {formatRelativeTime(item.reportedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const dataToShow = isSearchActive ? filteredActivities : incidents;

  return (
    <CustomSafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerTitle} accessibilityRole="header">
          Alarmiti
        </Text>
        {!isSearchActive && (
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={openSearch}
            accessibilityRole="button"
            accessibilityLabel="Search activities"
          >
            <Ionicons name="search" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={dataToShow}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={isSearchActive ? renderEmptySearch : null}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/report-incident")}
        accessibilityRole="button"
        accessibilityLabel="Report incident"
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
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
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    marginLeft: 12,
  },
  clearButton: {
    padding: 4,
  },
  searchResultsText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#B0B8C4",
    marginBottom: 16,
    paddingHorizontal: 28,
  },
  emptySearchState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  emptySearchTitle: {
    fontSize: 20,
    fontFamily: "Manrope-SemiBold",
    color: "#FFFFFF",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySearchDescription: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
    textAlign: "center",
    lineHeight: 22,
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
