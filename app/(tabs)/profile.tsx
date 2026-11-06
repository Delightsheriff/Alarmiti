import { IncidentRow } from "@/components/incident";
import { SectionHeader } from "@/components/ui/primitives";
import { PressableScale } from "@/components/ui/PressableScale";
import { myReportIds } from "@/data/sample";
import { useSampleStore } from "@/data/store";
import { showToast } from "@/lib/toast";
import { colors, radius, space, TAB_BAR_CLEARANCE, type } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { ComponentProps, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IconName = ComponentProps<typeof Ionicons>["name"];

// Anonymous avatars get a gradient picked from the handle, so the same
// neighbour always looks the same without showing a face.
const avatarGradients: [string, string][] = [
  ["#7CF2C8", "#3B82F6"],
  ["#FFC857", "#FF8A5C"],
  ["#7AA7FF", "#A78BFA"],
  ["#FF8A5C", "#FF5A6E"],
];

const hash = (handle: string) =>
  [...handle].reduce((sum, char) => sum * 31 + char.charCodeAt(0), 7) >>> 0;

function Avatar({
  handle,
  uri,
  size = 72,
}: {
  handle: string;
  uri?: string;
  size?: number;
}) {
  const style = { width: size, height: size, borderRadius: size / 2 };
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={style}
        accessibilityLabel="Your profile photo"
      />
    );
  }
  return (
    <LinearGradient
      colors={avatarGradients[hash(handle) % avatarGradients.length]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[style, styles.avatarFill]}
    >
      <View
        style={{
          width: size * 0.4,
          height: size * 0.4,
          borderRadius: size * 0.12,
          backgroundColor: "rgba(255,255,255,0.4)",
          transform: [{ rotate: `${hash(handle) % 90}deg` }],
        }}
      />
    </LinearGradient>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { profile, updateProfile, incidents, confirmed } = useSampleStore();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
  });

  const isAnonymous = profile.isAnonymous;
  const hasName = Boolean(profile.firstName && profile.lastName);
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();
  const shownAs = isAnonymous || !hasName ? profile.username : fullName;
  const myReports = incidents.filter(
    (incident) =>
      myReportIds.includes(incident.id) ||
      incident.reporter === profile.username ||
      (hasName && incident.reporter === fullName),
  );

  const startEditing = () => {
    setDraft({ firstName: profile.firstName, lastName: profile.lastName });
    setIsEditing(true);
  };

  const toggleAnonymous = (nextValue: boolean) => {
    updateProfile({ isAnonymous: nextValue });
    setIsEditing(false);
    // Going public without a name opens the editor rather than blocking the
    // switch, so anonymity can always be turned back on.
    if (!nextValue && !hasName) {
      startEditing();
      showToast("info", "Add your name so neighbours know who you are.");
    }
  };

  const saveName = () => {
    const firstName = draft.firstName.trim();
    const lastName = draft.lastName.trim();
    if (!firstName || !lastName) {
      showToast("error", "First name and last name are required.");
      return;
    }
    updateProfile({ firstName, lastName });
    setIsEditing(false);
    showToast("success", "Profile updated");
  };

  const changePhoto = async () => {
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

  const stats = [
    { label: "Reports", value: profile.stats.reports },
    {
      label: "Confirmations",
      value: profile.stats.confirmations + confirmed.size,
    },
    { label: "Helped", value: profile.stats.helped },
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{
        paddingTop: insets.top + space.sm,
        paddingBottom: TAB_BAR_CLEARANCE,
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headerCard}>
        <View style={styles.identity}>
          <PressableScale
            onPress={isAnonymous ? undefined : changePhoto}
            accessibilityLabel={
              isAnonymous ? "Anonymous avatar" : "Change profile photo"
            }
          >
            <Avatar
              handle={profile.username}
              uri={isAnonymous ? undefined : profile.avatarUri}
            />
            {!isAnonymous && (
              <View style={styles.cameraBadge}>
                <Ionicons name="camera" size={12} color={colors.onAccent} />
              </View>
            )}
          </PressableScale>
          <View style={{ flex: 1, gap: 4 }}>
            <Text
              style={[type.title, { color: colors.text }]}
              accessibilityRole="header"
            >
              {shownAs}
            </Text>
            <View style={styles.place}>
              <Ionicons name="location" size={14} color={colors.accent} />
              <Text style={[type.callout, { color: colors.textMuted }]}>
                {profile.region}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.stats}>
          {stats.map((stat, index) => (
            <View
              key={stat.label}
              style={[styles.stat, index > 0 && styles.statDivider]}
              accessible
              accessibilityLabel={`${stat.value} ${stat.label}`}
            >
              <Text style={[type.title, { color: colors.text }]}>
                {stat.value}
              </Text>
              <Text style={[type.caption, { color: colors.textMuted }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="How neighbours see you" />
        <View style={styles.card}>
          <View style={styles.preview}>
            <Avatar
              handle={profile.username}
              uri={isAnonymous ? undefined : profile.avatarUri}
              size={36}
            />
            <View style={{ flex: 1 }}>
              <Text style={[type.callout, styles.strong]}>{shownAs}</Text>
              <Text style={[type.caption, { color: colors.textMuted }]}>
                Reported a safety hazard · just now
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Ionicons name="eye-off" size={20} color={colors.textMuted} />
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={[type.callout, styles.strong]}>Stay anonymous</Text>
              <Text style={[type.caption, { color: colors.textMuted }]}>
                {isAnonymous
                  ? "Your name and photo are hidden on everything you post."
                  : "Your name and photo show on your reports."}
              </Text>
            </View>
            <Switch
              value={isAnonymous}
              onValueChange={toggleAnonymous}
              trackColor={{ false: colors.surfaceRaised, true: colors.accent }}
              accessibilityLabel="Stay anonymous"
            />
          </View>

          {!isAnonymous && !isEditing && (
            <>
              <View style={styles.divider} />
              <PressableScale
                scaleTo={0.99}
                onPress={startEditing}
                style={styles.row}
              >
                <Ionicons
                  name="create-outline"
                  size={20}
                  color={colors.textMuted}
                />
                <Text style={[type.callout, styles.strong, { flex: 1 }]}>
                  {hasName ? "Edit your name" : "Add your name"}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.textFaint}
                />
              </PressableScale>
            </>
          )}

          {!isAnonymous && isEditing && (
            <View style={styles.editor}>
              <TextInput
                style={[type.body, styles.input]}
                placeholder="First name"
                placeholderTextColor={colors.textFaint}
                value={draft.firstName}
                onChangeText={(firstName) => setDraft({ ...draft, firstName })}
                autoCapitalize="words"
                accessibilityLabel="First name"
              />
              <TextInput
                style={[type.body, styles.input]}
                placeholder="Last name"
                placeholderTextColor={colors.textFaint}
                value={draft.lastName}
                onChangeText={(lastName) => setDraft({ ...draft, lastName })}
                autoCapitalize="words"
                accessibilityLabel="Last name"
              />
              <View style={styles.editorActions}>
                <PressableScale
                  onPress={() => setIsEditing(false)}
                  style={[styles.button, styles.buttonQuiet]}
                >
                  <Text style={[type.callout, styles.strong]}>Cancel</Text>
                </PressableScale>
                <PressableScale haptic onPress={saveName} style={styles.button}>
                  <Text
                    style={[
                      type.callout,
                      styles.strong,
                      { color: colors.onAccent },
                    ]}
                  >
                    Save
                  </Text>
                </PressableScale>
              </View>
            </View>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="My reports"
          action={
            <Text style={[type.caption, { color: colors.textMuted }]}>
              {myReports.length}
            </Text>
          }
        />
        {myReports.map((incident) => (
          <IncidentRow key={incident.id} incident={incident} />
        ))}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Settings" />
        <View style={styles.card}>
          {(
            [
              ["notifications-outline", "Alert radius", "1 km"],
              ["moon-outline", "Quiet hours", "11 PM – 7 AM"],
              ["information-circle-outline", "About this concept", ""],
            ] as [IconName, string, string][]
          ).map(([icon, label, value], index) => (
            <View key={label}>
              {index > 0 && <View style={styles.divider} />}
              <PressableScale
                scaleTo={0.99}
                onPress={() =>
                  showToast("info", "Settings are static in this concept")
                }
                style={styles.row}
              >
                <Ionicons name={icon} size={20} color={colors.textMuted} />
                <Text style={[type.callout, styles.strong, { flex: 1 }]}>
                  {label}
                </Text>
                {value ? (
                  <Text style={[type.callout, { color: colors.textMuted }]}>
                    {value}
                  </Text>
                ) : null}
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.textFaint}
                />
              </PressableScale>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  headerCard: {
    marginHorizontal: space.gutter,
    padding: space.xl,
    gap: space.xl,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  identity: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.lg,
  },
  avatarFill: {
    alignItems: "center",
    justifyContent: "center",
  },
  cameraBadge: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  place: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  stats: {
    flexDirection: "row",
    paddingTop: space.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
  },
  stat: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  statDivider: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: colors.hairline,
  },
  section: {
    marginTop: space.xxxl,
  },
  card: {
    marginHorizontal: space.gutter,
    paddingHorizontal: space.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  preview: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    paddingVertical: space.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    paddingVertical: space.lg,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.hairline,
  },
  strong: {
    color: colors.text,
    fontFamily: "Inter-SemiBold",
  },
  editor: {
    gap: space.sm,
    paddingBottom: space.lg,
  },
  input: {
    height: 48,
    paddingHorizontal: space.lg,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    color: colors.text,
  },
  editorActions: {
    flexDirection: "row",
    gap: space.sm,
    marginTop: space.xs,
  },
  button: {
    flex: 1,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonQuiet: {
    backgroundColor: colors.surfaceRaised,
  },
});
