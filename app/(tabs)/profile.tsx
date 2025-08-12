import CustomSafeAreaView from "@/components/custom-safe-area-view";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  // Anonymous user data
  const anonymousId = "Watcher_7429";
  const userEmail = "sophia.carter@email.com"; // This would come from auth

  const handleToggleAnonymity = () => {
    if (!isAnonymous && (!profileData.firstName || !profileData.lastName)) {
      Alert.alert(
        "Profile Required",
        "Please complete your profile before disabling anonymous mode.",
        [{ text: "OK" }]
      );
      return;
    }
    setIsAnonymous(!isAnonymous);
    setIsEditingProfile(false);
  };

  const handleSaveProfile = () => {
    if (!profileData.firstName.trim() || !profileData.lastName.trim()) {
      Alert.alert("Error", "First name and last name are required.");
      return;
    }
    setIsEditingProfile(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const settingsItems = [
    { icon: "notifications", label: "Notifications", hasChevron: true },
    { icon: "shield-checkmark", label: "Privacy & Safety", hasChevron: true },
    { icon: "lock-closed", label: "Security", hasChevron: true },
    { icon: "globe", label: "Language", value: "English", hasChevron: true },
    { icon: "help-circle", label: "Help & Support", hasChevron: true },
  ];

  return (
    <CustomSafeAreaView>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              {isAnonymous ? (
                <Ionicons name="shield" size={32} color="#1A2A44" />
              ) : (
                <Ionicons name="person" size={32} color="#1A2A44" />
              )}
            </View>
            {isAnonymous && <View style={styles.anonymousBadge} />}
          </View>

          <Text style={styles.profileName}>
            {isAnonymous
              ? anonymousId
              : profileData.firstName && profileData.lastName
              ? `${profileData.firstName} ${profileData.lastName}`
              : "Complete Your Profile"}
          </Text>

          <Text style={styles.profileEmail}>{userEmail}</Text>

          <View style={styles.anonymityToggle}>
            <View style={styles.toggleContent}>
              <View style={styles.toggleIcon}>
                {isAnonymous ? (
                  <Ionicons name="eye-off" size={16} color="#1A2A44" />
                ) : (
                  <Ionicons name="eye" size={16} color="#1A2A44" />
                )}
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
                onPress={() => setIsEditingProfile(!isEditingProfile)}
              >
                <Ionicons name="create" size={16} color="#FFFFFF" />
                <Text style={styles.editButtonText}>
                  {isEditingProfile ? "Cancel" : "Edit"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionContent}>
              <View style={styles.inputRow}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  {isEditingProfile ? (
                    <TextInput
                      style={styles.textInput}
                      value={profileData.firstName}
                      onChangeText={(text) =>
                        setProfileData({ ...profileData, firstName: text })
                      }
                      placeholder="Enter first name"
                      placeholderTextColor="#B0B8C4"
                    />
                  ) : (
                    <Text style={styles.inputValue}>
                      {profileData.firstName || "Not set"}
                    </Text>
                  )}
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  {isEditingProfile ? (
                    <TextInput
                      style={styles.textInput}
                      value={profileData.lastName}
                      onChangeText={(text) =>
                        setProfileData({ ...profileData, lastName: text })
                      }
                      placeholder="Enter last name"
                      placeholderTextColor="#B0B8C4"
                    />
                  ) : (
                    <Text style={styles.inputValue}>
                      {profileData.lastName || "Not set"}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                {isEditingProfile ? (
                  <TextInput
                    style={styles.textInput}
                    value={profileData.phone}
                    onChangeText={(text) =>
                      setProfileData({ ...profileData, phone: text })
                    }
                    placeholder="Enter phone number"
                    placeholderTextColor="#B0B8C4"
                    keyboardType="phone-pad"
                  />
                ) : (
                  <Text style={styles.inputValue}>
                    {profileData.phone || "Not set"}
                  </Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Address</Text>
                {isEditingProfile ? (
                  <TextInput
                    style={styles.textInput}
                    value={profileData.address}
                    onChangeText={(text) =>
                      setProfileData({ ...profileData, address: text })
                    }
                    placeholder="Enter your address"
                    placeholderTextColor="#B0B8C4"
                    multiline
                  />
                ) : (
                  <Text style={styles.inputValue}>
                    {profileData.address || "Not set"}
                  </Text>
                )}
              </View>

              {isEditingProfile && (
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveProfile}
                >
                  <Text style={styles.saveButtonText}>Save Profile</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.sectionContent}>
            {settingsItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={styles.settingIcon}>
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color="#1A2A44"
                    />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    {item.value && (
                      <Text style={styles.settingValue}>{item.value}</Text>
                    )}
                  </View>
                </View>
                {item.hasChevron && (
                  <Ionicons name="chevron-forward" size={20} color="#B0B8C4" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

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
  container: {
    flex: 1,
    backgroundColor: "#1A2A44",
  },
  scrollView: {
    flex: 1,
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
    alignItems: "center",
    justifyContent: "center",
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
  profileEmail: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
    marginBottom: 24,
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
    overflow: "hidden",
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#FFFFFF",
    marginBottom: 8,
    paddingHorizontal: 16,
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
    marginHorizontal: 16,
    minHeight: 44,
  },
  inputValue: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  saveButton: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#1A2A44",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#FFFFFF",
  },
  settingValue: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
    marginTop: 2,
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
