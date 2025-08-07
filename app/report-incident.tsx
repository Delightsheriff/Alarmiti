import CustomSafeAreaView from "@/components/custom-safe-area-view";
import { Ionicons } from "@expo/vector-icons";
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
  const [selectedType, setSelectedType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const incidentTypes = [
    "Suspicious Activity",
    "Theft",
    "Vandalism",
    "Noise Complaint",
    "Safety Concern",
    "Lost Pet",
    "Other",
  ];

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
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Report Incident</Text>
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
              <TouchableOpacity style={styles.dropdown}>
                <Text
                  style={[
                    styles.dropdownText,
                    !selectedType && styles.placeholderText,
                  ]}
                >
                  {selectedType || "Choose incident type"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#B0B8C4" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter location or address"
                placeholderTextColor="#B0B8C4"
                value={location}
                onChangeText={setLocation}
                autoCapitalize="words"
              />
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
              />
            </View>

            <View style={styles.mediaSection}>
              <Text style={styles.inputLabel}>Add Media</Text>
              <View style={styles.mediaButtons}>
                <TouchableOpacity style={styles.mediaButton}>
                  <Ionicons name="camera" size={24} color="#1A2A44" />
                  <Text style={styles.mediaButtonText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mediaButton}>
                  <Ionicons name="cloud-upload" size={24} color="#1A2A44" />
                  <Text style={styles.mediaButtonText}>Upload</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.mediaHint}>
                Add visual evidence to support your report.
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.submitButton}>
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
