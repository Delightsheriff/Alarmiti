import CustomSafeAreaView from "@/components/custom-safe-area-view";
import { useSampleStore } from "@/data/store";
import { showToast } from "@/lib/toast";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { profile, updateProfile } = useSampleStore();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [draft, setDraft] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
  });

  const isAnonymous = profile.isAnonymous;
  const hasName = Boolean(profile.firstName && profile.lastName);

  const startEditing = () => {
    setDraft({ firstName: profile.firstName, lastName: profile.lastName });
    setIsEditingProfile(true);
  };

  const handleToggleAnonymity = (nextValue: boolean) => {
    updateProfile({ isAnonymous: nextValue });
    setIsEditingProfile(false);

    // Going public without a name opens the editor rather than blocking the
    // switch, so anonymity can always be turned back on.
    if (!nextValue && !hasName) {
      startEditing();
      showToast("info", "Add your name so neighbours know who you are.");
    }
  };

  const handleSaveProfile = () => {
    const firstName = draft.firstName.trim();
    const lastName = draft.lastName.trim();
    if (!firstName || !lastName) {
      showToast("error", "First name and last name are required.");
      return;
    }
    updateProfile({ firstName, lastName });
    setIsEditingProfile(false);
    showToast("success", "Profile updated");
  };

  const handleChangePhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== "granted") {
      showToast("error", "Please allow photo library access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      updateProfile({ avatarUri: result.assets[0].uri });
    }
  };

  return (
    <CustomSafeAreaView>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle} accessibilityRole="header">
            Profile
          </Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              {isAnonymous ? (
                <Ionicons name="shield" size={32} color="#1A2A44" />
              ) : profile.avatarUri ? (
                <Image
                  source={{ uri: profile.avatarUri }}
                  style={{ width: 80, height: 80, borderRadius: 40 }}
                  accessibilityLabel="Your profile photo"
                />
              ) : (
                <Ionicons name="person" size={32} color="#1A2A44" />
              )}
            </View>
            {isAnonymous && <View style={styles.anonymousBadge} />}
          </View>

          {!isAnonymous && (
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={handleChangePhoto}
              accessibilityRole="button"
              accessibilityLabel="Change profile photo"
            >
              <Ionicons name="camera" size={16} color="#1A2A44" />
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.profileName}>
            {isAnonymous
              ? profile.username
              : hasName
              ? `${profile.firstName} ${profile.lastName}`
              : "Complete Your Profile"}
          </Text>

          {!isAnonymous && (
            <Text style={styles.profileEmail}>{profile.email}</Text>
          )}

          {/* Location Display */}
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="#B0B8C4" />
            <Text style={styles.locationText}>{profile.region}</Text>
          </View>

          <View style={styles.anonymityToggle}>
            <View style={styles.toggleContent}>
              <View style={styles.toggleIcon}>
                <Ionicons
                  name={isAnonymous ? "eye-off" : "eye"}
                  size={16}
                  color="#1A2A44"
                />
              </View>
              <View style={styles.toggleText}>
                <Text style={styles.toggleLabel}>Anonymous Mode</Text>
                <Text style={styles.toggleDescription}>
                  {isAnonymous
                    ? "Your identity is hidden from other users"
                    : "Your profile is visible to the community"}
                </Text>
              </View>
            </View>
            <Switch
              value={isAnonymous}
              onValueChange={handleToggleAnonymity}
              accessibilityLabel="Anonymous mode"
              trackColor={{
                false: "rgba(255, 255, 255, 0.2)",
                true: "#FFFFFF",
              }}
              thumbColor={isAnonymous ? "#1A2A44" : "#B0B8C4"}
              ios_backgroundColor="rgba(255, 255, 255, 0.2)"
            />
          </View>
        </View>

        {/* Profile Form Section (only visible when not anonymous) */}
        {!isAnonymous && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Profile Information</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  isEditingProfile ? setIsEditingProfile(false) : startEditing()
                }
                accessibilityRole="button"
                accessibilityLabel={
                  isEditingProfile ? "Cancel editing" : "Edit profile"
                }
              >
                <Ionicons name="create" size={16} color="#FFFFFF" />
                <Text style={styles.editButtonText}>
                  {isEditingProfile ? "Cancel" : "Edit"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionContent}>
              <View style={styles.nameRow}>
                <View style={styles.nameInputContainer}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  {isEditingProfile ? (
                    <TextInput
                      style={styles.textInput}
                      value={draft.firstName}
                      onChangeText={(text) =>
                        setDraft({ ...draft, firstName: text })
                      }
                      placeholder="Enter first name"
                      placeholderTextColor="#B0B8C4"
                      accessibilityLabel="First name"
                    />
                  ) : (
                    <View style={styles.inputDisplayContainer}>
                      <Text style={styles.inputValue}>
                        {profile.firstName || "Not set"}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.nameInputContainer}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  {isEditingProfile ? (
                    <TextInput
                      style={styles.textInput}
                      value={draft.lastName}
                      onChangeText={(text) =>
                        setDraft({ ...draft, lastName: text })
                      }
                      placeholder="Enter last name"
                      placeholderTextColor="#B0B8C4"
                      accessibilityLabel="Last name"
                    />
                  ) : (
                    <View style={styles.inputDisplayContainer}>
                      <Text style={styles.inputValue}>
                        {profile.lastName || "Not set"}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.locationInputGroup}>
                <Text style={styles.inputLabel}>Current Location</Text>
                <View style={styles.locationInputContainer}>
                  <Ionicons name="location" size={18} color="#B0B8C4" />
                  <Text style={styles.locationInputText}>{profile.region}</Text>
                </View>
              </View>

              {isEditingProfile && (
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveProfile}
                  accessibilityRole="button"
                >
                  <Text style={styles.saveButtonText}>Save Profile</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Privacy Notice */}
        <View style={styles.privacyNotice}>
          <Ionicons name="shield-checkmark" size={16} color="#B0B8C4" />
          <Text style={styles.privacyText}>
            {isAnonymous
              ? "Your reports and activities are completely anonymous. Only you can see your identity."
              : "Your profile is visible to verified community members for building trust."}
          </Text>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Manrope-Bold",
    color: "#FFFFFF",
  },
  profileSection: {
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#B0B8C4",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  anonymousBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    borderWidth: 3,
    borderColor: "#1A2A44",
  },
  profileName: {
    fontSize: 24,
    fontFamily: "Manrope-SemiBold",
    color: "#FFFFFF",
    marginBottom: 4,
    textAlign: "center",
  },
  changePhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  changePhotoText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "#1A2A44",
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
    maxWidth: 200,
  },
  anonymityToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    width: "100%",
  },
  toggleContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  toggleIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  toggleText: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  toggleDescription: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
    lineHeight: 16,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Manrope-SemiBold",
    color: "#FFFFFF",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#FFFFFF",
  },
  sectionContent: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
  },
  nameRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  nameInputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    minHeight: 48,
  },
  inputDisplayContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    minHeight: 48,
    justifyContent: "center",
  },
  inputValue: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
  },
  locationInputGroup: {
    marginBottom: 20,
  },
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    minHeight: 48,
    gap: 12,
  },
  locationInputText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
  },
  saveButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#1A2A44",
  },
  privacyNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginHorizontal: 24,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    gap: 12,
  },
  privacyText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
    lineHeight: 20,
  },
});
