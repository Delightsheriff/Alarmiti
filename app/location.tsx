import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface LocationSuggestion {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

export default function LocationScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        searchLocations(searchQuery);
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const searchLocations = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&addressdetails=1`,
        {
          headers: {
            "User-Agent": "YourAppName/1.0 (your@email.com)",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Extract only neighborhood / region names
      const filtered = data.map((item: any) => {
        const { address } = item;
        return {
          place_id: item.place_id,
          display_name:
            address.suburb ||
            address.neighbourhood ||
            address.city ||
            item.display_name,
          lat: item.lat,
          lon: item.lon,
        };
      });

      setSuggestions(filtered);
    } catch (error) {
      console.error("Error searching locations:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (location: LocationSuggestion) => {
    setSelectedLocation(location.display_name);
    setSearchQuery(location.display_name);
    setSuggestions([]);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSuggestions([]);
  };

  const handleContinue = async () => {
    if (!selectedLocation) {
      return;
    }

    try {
      await AsyncStorage.setItem("userLocation", selectedLocation);
      console.log(selectedLocation);
      router.replace("/auth");
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  const renderSuggestion = ({ item }: { item: LocationSuggestion }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleLocationSelect(item)}
    >
      <Feather name="map-pin" size={16} color="#B0B8C4" />
      <Text style={styles.suggestionText} numberOfLines={2}>
        {item.display_name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <FlatList
          data={[{ key: "main" }]}
          renderItem={() => (
            <View>
              <View style={styles.header}>
                <View style={styles.iconContainer}>
                  <Feather name="map-pin" size={48} color="#FFFFFF" />
                </View>
                <Text style={styles.title}>What&apos;s your location?</Text>
                <Text style={styles.subtitle}>
                  Help us connect you with your neighborhood watch community.
                </Text>
              </View>

              <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                  <Feather name="search" size={18} color="#B0B8C4" />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search for your neighborhood"
                    placeholderTextColor="#B0B8C4"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={clearSearch}
                    >
                      <Feather name="x" size={18} color="#B0B8C4" />
                    </TouchableOpacity>
                  )}
                  {isLoading && (
                    <ActivityIndicator size="small" color="#B0B8C4" />
                  )}
                </View>

                {suggestions.length > 0 && (
                  <View style={styles.suggestionsContainer}>
                    <FlatList
                      data={suggestions}
                      keyExtractor={(item) => item.place_id}
                      renderItem={renderSuggestion}
                      style={styles.suggestionsList}
                      nestedScrollEnabled
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                )}
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>
                  Why do we need your location?
                </Text>
                <View style={styles.infoList}>
                  <Text style={styles.infoItem}>
                    • Connect you with nearby neighbors
                  </Text>
                  <Text style={styles.infoItem}>
                    • Show relevant local incidents
                  </Text>
                  <Text style={styles.infoItem}>
                    • Enable location-based alerts
                  </Text>
                  <Text style={styles.infoItem}>
                    • Help emergency services if needed
                  </Text>
                </View>
                <Text style={styles.privacyNote}>
                  Your exact location is kept private and secure. Only general
                  area information is shared with the community.
                </Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedLocation && styles.buttonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!selectedLocation}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A2A44",
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  title: {
    fontSize: 28,
    fontFamily: "Manrope-Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  searchContainer: {
    marginBottom: 32,
    position: "relative",
    zIndex: 1000,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    minHeight: 48,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
  },
  clearButton: {
    padding: 4,
  },
  suggestionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginTop: 4,
    maxHeight: 180,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  suggestionsList: {
    maxHeight: 180,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(26, 42, 68, 0.1)",
    gap: 12,
  },
  suggestionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#1A2A44",
    lineHeight: 20,
  },
  infoContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  infoTitle: {
    fontSize: 18,
    fontFamily: "Manrope-SemiBold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  infoList: {
    marginBottom: 16,
  },
  infoItem: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
    lineHeight: 22,
    marginBottom: 8,
  },
  privacyNote: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
    lineHeight: 18,
    fontStyle: "italic",
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "#1A2A44",
  },
  continueButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 52,
    justifyContent: "center",
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#1A2A44",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
