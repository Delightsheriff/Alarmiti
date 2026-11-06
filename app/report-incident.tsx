import CustomSafeAreaView from "@/components/custom-safe-area-view";
import {
  categories,
  IncidentCategory,
  neighbourhoods,
  reportableCategories,
} from "@/data/sample";
import { useSampleStore } from "@/data/store";
import { showToast } from "@/lib/toast";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReportIncidentScreen() {
  const router = useRouter();
  const { addIncident } = useSampleStore();
  const [selectedType, setSelectedType] = useState<IncidentCategory | null>(
    null
  );
  const [isTypeListOpen, setIsTypeListOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [isLocationPicked, setIsLocationPicked] = useState(false);
  const [description, setDescription] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const locationQuery = location.trim().toLowerCase();
  const locationSuggestions =
    isLocationPicked || locationQuery.length === 0
      ? []
      : neighbourhoods.filter((name) =>
          name.toLowerCase().includes(locationQuery)
        );

  const handleLocationChange = (text: string) => {
    setLocation(text);
    // Typing again means the earlier pick no longer applies.
    setIsLocationPicked(false);
  };

  const handleLocationSelect = (name: string) => {
    setLocation(name);
    setIsLocationPicked(true);
  };

  const handleSelectType = (type: IncidentCategory) => {
    setSelectedType(type);
    setIsTypeListOpen(false);
  };

  const handleTakePhoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status !== "granted") {
        showToast("error", "Please allow camera access.");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
      if (!result.canceled && result.assets.length > 0) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch {
      showToast("error", "The camera isn't available on this device.");
    }
  };

  const handleUploadPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== "granted") {
      showToast("error", "Please allow photo library access.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!selectedType || !location.trim() || !description.trim()) {
      showToast("error", "Add a type, location and description first.");
      return;
    }

    addIncident({
      category: selectedType,
      title: `${categories[selectedType].label} at ${location.trim()}`,
      description: description.trim(),
      location: location.trim(),
      image: photoUri ?? undefined,
    });
    showToast("success", "Report shared with your neighbours");
    router.back();
  };

  return (
    <CustomSafeAreaView>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
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
            Report Incident
          </Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Select Incident Type</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setIsTypeListOpen(!isTypeListOpen)}
                accessibilityRole="button"
                accessibilityLabel={`Incident type: ${
                  selectedType ? categories[selectedType].label : "not chosen"
                }`}
                accessibilityState={{ expanded: isTypeListOpen }}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    !selectedType && styles.placeholderText,
                  ]}
                >
                  {selectedType
                    ? categories[selectedType].label
                    : "Choose incident type"}
                </Text>
                <Ionicons
                  name={isTypeListOpen ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#B0B8C4"
                />
              </TouchableOpacity>

              {isTypeListOpen && (
                <View style={styles.optionList}>
                  {reportableCategories.map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={styles.optionItem}
                      onPress={() => handleSelectType(type)}
                      accessibilityRole="button"
                      accessibilityState={{ selected: type === selectedType }}
                    >
                      <Ionicons
                        name={categories[type].icon}
                        size={18}
                        color="#B0B8C4"
                      />
                      <Text style={styles.optionText}>
                        {categories[type].label}
                      </Text>
                      {type === selectedType && (
                        <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Search your neighbourhood"
                placeholderTextColor="#B0B8C4"
                value={location}
                onChangeText={handleLocationChange}
                autoCapitalize="words"
                autoCorrect={false}
                accessibilityLabel="Location"
              />
              {locationSuggestions.length > 0 && (
                <View style={styles.optionList}>
                  {locationSuggestions.map((name) => (
                    <TouchableOpacity
                      key={name}
                      style={styles.optionItem}
                      onPress={() => handleLocationSelect(name)}
                      accessibilityRole="button"
                    >
                      <Ionicons name="location" size={18} color="#B0B8C4" />
                      <Text style={styles.optionText}>{name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Describe what happened..."
                placeholderTextColor="#B0B8C4"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                accessibilityLabel="Description"
              />
            </View>

            <View style={styles.mediaSection}>
              <Text style={styles.inputLabel}>Add Media</Text>
              {photoUri ? (
                <View style={styles.preview}>
                  <Image
                    source={{ uri: photoUri }}
                    style={styles.previewImage}
                    contentFit="cover"
                    accessibilityLabel="Attached photo"
                  />
                  <TouchableOpacity
                    style={styles.removePhoto}
                    onPress={() => setPhotoUri(null)}
                    accessibilityRole="button"
                    accessibilityLabel="Remove photo"
                  >
                    <Ionicons name="close" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.mediaButtons}>
                  <TouchableOpacity
                    style={styles.mediaButton}
                    onPress={handleTakePhoto}
                    accessibilityRole="button"
                  >
                    <Ionicons name="camera" size={24} color="#1A2A44" />
                    <Text style={styles.mediaButtonText}>Take Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mediaButton}
                    onPress={handleUploadPhoto}
                    accessibilityRole="button"
                  >
                    <Ionicons name="cloud-upload" size={24} color="#1A2A44" />
                    <Text style={styles.mediaButtonText}>Upload</Text>
                  </TouchableOpacity>
                </View>
              )}
              <Text style={styles.mediaHint}>
                Add visual evidence to support your report.
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            accessibilityRole="button"
          >
            <Text style={styles.submitButtonText}>Submit Report</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
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
  scrollContent: {
    paddingBottom: 20,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    minHeight: 52,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
  },
  placeholderText: {
    color: "#B0B8C4",
  },
  optionList: {
    marginTop: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    overflow: "hidden",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
  },
  textInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    minHeight: 52,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 16,
  },
  mediaSection: {
    marginBottom: 24,
  },
  mediaButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  mediaButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  mediaButtonText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "#1A2A44",
  },
  preview: {
    position: "relative",
    marginBottom: 12,
  },
  previewImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  removePhoto: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  mediaHint: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
    textAlign: "center",
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  submitButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#1A2A44",
  },
});
