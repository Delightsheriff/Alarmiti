import CustomSafeAreaView from "@/components/custom-safe-area-view";
import { Ionicons } from "@expo/vector-icons";
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

  const filteredActivities = recentActivities.filter(
    (activity) =>
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.type.toLowerCase().includes(searchQuery.toLowerCase())
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
            />
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
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

  const dataToShow = isSearchActive ? filteredActivities : recentActivities;

  return (
    <CustomSafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alarmit</Text>
        {!isSearchActive && (
          <TouchableOpacity style={styles.settingsButton} onPress={openSearch}>
            <Ionicons name="search" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={dataToShow}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={isSearchActive ? renderEmptySearch : null}
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
