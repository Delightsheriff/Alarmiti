import CustomSafeAreaView from "@/components/custom-safe-area-view";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ProfileItem {
  icon: string;
  label: string;
  value?: string;
  hasChevron?: boolean;
}

interface ProfileSection {
  title: string;
  items: ProfileItem[];
}

export default function ProfileScreen() {
  const profileSections: ProfileSection[] = [
    {
      title: "Account",
      items: [
        { icon: "mail", label: "Email", value: "test@email.com" },
        { icon: "call", label: "Phone", value: "+1 (555) 123-4567" },
        { icon: "location", label: "Address", value: "123 Choba, Uniport" },
      ],
    },
    {
      title: "Settings",
      items: [
        { icon: "notifications", label: "Notifications", hasChevron: true },
        { icon: "shield-checkmark", label: "Privacy", hasChevron: true },
        { icon: "lock-closed", label: "Security", hasChevron: true },
        {
          icon: "globe",
          label: "Language",
          value: "English",
          hasChevron: true,
        },
        { icon: "help-circle", label: "Help", hasChevron: true },
      ],
    },
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

        <View style={styles.profileSection}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dhlbkd9i9/image/upload/v1754604178/Screenshot_2025-08-06-00-51-09-885_com.whatsapp_q7qr59.png",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Dynamo</Text>
          <TouchableOpacity style={styles.viewProfileButton}>
            <Text style={styles.viewProfileText}>View Profile</Text>
          </TouchableOpacity>
          <Text style={styles.joinedText}>Joined 2025</Text>
        </View>

        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity key={itemIndex} style={styles.settingItem}>
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
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#B0B8C4"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
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
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  profileName: {
    fontSize: 24,
    fontFamily: "Manrope-SemiBold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  viewProfileButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 8,
  },
  viewProfileText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#FFFFFF",
  },
  joinedText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Manrope-SemiBold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  sectionContent: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    overflow: "hidden",
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
});
