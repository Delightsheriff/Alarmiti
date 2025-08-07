import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LocationScreen() {
  const router = useRouter();
  const [manualLocation, setManualLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const requestLocationPermission = async () => {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to show nearby alerts.",
          [{ text: "OK" }]
        );
        setIsLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        timeInterval: 10000,
      });
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      let locationString = "Current Location";

      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        locationString = `${address.city || address.subregion}, ${
          address.region
        }`;
      }

      await AsyncStorage.setItem("userLocation", locationString);
      await AsyncStorage.setItem("hasCompletedLocationSetup", "true");

      router.replace("/auth");
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Failed to get your location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualLocation = async () => {
    if (!manualLocation.trim()) {
      Alert.alert("Error", "Please enter your area or neighborhood.");
      return;
    }

    await AsyncStorage.setItem("userLocation", manualLocation.trim());
    await AsyncStorage.setItem("hasCompletedLocationSetup", "true");

    router.replace("/auth");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="location-sharp" size={80} color="#FFFFFF" />
          </View>

          <Text style={styles.title}>Enable Location Access</Text>
          <Text style={styles.subtitle}>
            To show alerts near you, we need your location or area.
          </Text>

          <TouchableOpacity
            style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
            onPress={requestLocationPermission}
            disabled={isLoading}
          >
            <Ionicons name="location-sharp" size={20} color="#1A2A44" />
            <Text style={styles.primaryButtonText}>
              {isLoading ? "Getting Location..." : "Use My Current Location"}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Enter Your Area or Neighborhood
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="E.g., Choba, Port Harcourt"
              placeholderTextColor="#B0B8C4"
              value={manualLocation}
              onChangeText={setManualLocation}
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={handleManualLocation}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.primaryButton,
              !manualLocation.trim() && styles.buttonDisabled,
            ]}
            onPress={handleManualLocation}
            disabled={!manualLocation.trim()}
          >
            <Text
              style={[
                styles.primaryButtonText,
                !manualLocation.trim() && styles.buttonTextDisabled,
              ]}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A2A44",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    minHeight: "100%",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: "Manrope",
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter",
    color: "#B0B8C4",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    minHeight: 56,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#1A2A44",
    marginLeft: 8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#B0B8C4",
    opacity: 0.3,
  },
  dividerText: {
    fontSize: 14,
    fontFamily: "Inter",
    color: "#B0B8C4",
    marginHorizontal: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Inter",
    color: "#FFFFFF",
    minHeight: 56,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonTextDisabled: {
    color: "#1A2A44",
  },
});
