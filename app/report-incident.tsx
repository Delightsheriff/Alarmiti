import { PressableScale } from "@/components/ui/PressableScale";
import {
  categories,
  IncidentCategory,
  neighbourhoods,
  reportableCategories,
} from "@/data/sample";
import { useSampleStore } from "@/data/store";
import { showToast } from "@/lib/toast";
import { colors, radius, severity, space, tint, type } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { ReactNode, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ReportIncidentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addIncident, profile } = useSampleStore();
  const [category, setCategory] = useState<IncidentCategory | null>(null);
  const [location, setLocation] = useState(profile.region);
  const [isLocationPicked, setIsLocationPicked] = useState(true);
  const [description, setDescription] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [urgent, setUrgent] = useState(false);
  const [anonymous, setAnonymous] = useState(profile.isAnonymous);

  const locationQuery = location.trim().toLowerCase();
  const locationSuggestions =
    isLocationPicked || locationQuery.length === 0
      ? []
      : neighbourhoods.filter((name) =>
          name.toLowerCase().includes(locationQuery),
        );
  const ready = Boolean(category && location.trim() && description.trim());

  const pickLocation = (name: string) => {
    setLocation(name);
    setIsLocationPicked(true);
  };

  const addPhoto = async (source: "camera" | "library") => {
    try {
      const permission =
        source === "camera"
          ? await ImagePicker.requestCameraPermissionsAsync()
          : await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.status !== "granted") {
        showToast(
          "error",
          source === "camera"
            ? "Please allow camera access."
            : "Please allow photo library access.",
        );
        return;
      }
      const result =
        source === "camera"
          ? await ImagePicker.launchCameraAsync({ quality: 0.8 })
          : await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ["images"],
              quality: 0.8,
            });
      if (!result.canceled && result.assets.length > 0) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch {
      showToast("error", "The camera isn't available on this device.");
    }
  };

  const submit = () => {
    if (!category || !ready) {
      showToast("error", "Add a type, place and description first.");
      return;
    }
    const created = addIncident({
      category,
      description: description.trim(),
      location: location.trim(),
      urgent,
      anonymous,
      image: photoUri ? { uri: photoUri } : undefined,
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
    showToast("success", "Shared with your neighbours", {
      detail: "Tap to view your report",
      onPress: () =>
        router.push({
          pathname: "/incident-details",
          params: { id: created.id },
        }),
    });
  };

  return (
    // One non-collapsable root, so the form sheet doesn't try to lay out the
    // header and scroll view itself.
    <View style={styles.screen} collapsable={false}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.header}>
          <Text
            style={[type.title, { color: colors.text }]}
            accessibilityRole="header"
          >
            Report something
          </Text>
          <PressableScale
            onPress={() => router.back()}
            accessibilityLabel="Close"
            style={styles.close}
          >
            <Ionicons name="close" size={20} color={colors.text} />
          </PressableScale>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          <Step number={1} title="What's happening?">
            <View style={styles.grid}>
              {reportableCategories.map((key) => {
                const item = categories[key];
                const { color } = severity[item.severity];
                const selected = key === category;
                return (
                  <PressableScale
                    key={key}
                    haptic
                    onPress={() => setCategory(key)}
                    accessibilityLabel={item.label}
                    accessibilityState={{ selected }}
                    style={[
                      styles.tile,
                      selected && {
                        borderColor: color,
                        backgroundColor: tint(color, 0.12),
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.tileIcon,
                        { backgroundColor: tint(color) },
                      ]}
                    >
                      <Ionicons name={item.icon} size={18} color={color} />
                    </View>
                    <Text
                      style={[type.callout, styles.strong, { flex: 1 }]}
                      numberOfLines={2}
                    >
                      {item.label}
                    </Text>
                  </PressableScale>
                );
              })}
            </View>
          </Step>

          <Step number={2} title="Where?">
            <PressableScale
              onPress={() => pickLocation(profile.region)}
              accessibilityState={{ selected: location === profile.region }}
              style={[
                styles.areaChip,
                location === profile.region && styles.areaChipSelected,
              ]}
            >
              <Ionicons
                name="navigate"
                size={14}
                color={
                  location === profile.region ? colors.onAccent : colors.text
                }
              />
              <Text
                style={[
                  type.callout,
                  {
                    color:
                      location === profile.region
                        ? colors.onAccent
                        : colors.text,
                  },
                ]}
              >
                Use my area ({profile.region})
              </Text>
            </PressableScale>
            <View style={styles.field}>
              <Ionicons name="search" size={18} color={colors.textMuted} />
              <TextInput
                style={[type.body, styles.input]}
                placeholder="Search a street or area"
                placeholderTextColor={colors.textFaint}
                value={location}
                onChangeText={(text) => {
                  setLocation(text);
                  // Typing again means the earlier pick no longer applies.
                  setIsLocationPicked(false);
                }}
                autoCapitalize="words"
                autoCorrect={false}
                accessibilityLabel="Location"
              />
            </View>
            {locationSuggestions.length > 0 && (
              <View style={styles.suggestions}>
                {locationSuggestions.map((name) => (
                  <PressableScale
                    key={name}
                    scaleTo={0.99}
                    onPress={() => pickLocation(name)}
                    style={styles.suggestion}
                  >
                    <Ionicons
                      name="location-outline"
                      size={16}
                      color={colors.textMuted}
                    />
                    <Text style={[type.callout, { color: colors.text }]}>
                      {name}
                    </Text>
                  </PressableScale>
                ))}
              </View>
            )}
            <Text style={[type.caption, { color: colors.textFaint }]}>
              Only the general area is shared, never an exact address.
            </Text>
          </Step>

          <Step number={3} title="Details">
            <TextInput
              style={[type.body, styles.field, styles.textArea]}
              placeholder="What did you see? Avoid naming people."
              placeholderTextColor={colors.textFaint}
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
              accessibilityLabel="Description"
            />

            {photoUri ? (
              <View>
                <Image
                  source={{ uri: photoUri }}
                  style={styles.photo}
                  contentFit="cover"
                  accessibilityLabel="Attached photo"
                />
                <PressableScale
                  onPress={() => setPhotoUri(null)}
                  accessibilityLabel="Remove photo"
                  style={styles.removePhoto}
                >
                  <Ionicons name="close" size={16} color={colors.text} />
                </PressableScale>
              </View>
            ) : (
              <View style={styles.photoRow}>
                <PhotoButton
                  icon="camera"
                  label="Camera"
                  onPress={() => addPhoto("camera")}
                />
                <PhotoButton
                  icon="images"
                  label="Library"
                  onPress={() => addPhoto("library")}
                />
              </View>
            )}

            <View style={styles.toggles}>
              <ToggleRow
                icon="alert-circle"
                iconColor={severity.urgent.color}
                title="Urgent"
                detail="Someone could get hurt right now. Neighbours nearby get an alert."
                value={urgent}
                onChange={setUrgent}
              />
              <View style={styles.divider} />
              <ToggleRow
                icon="eye-off"
                iconColor={colors.textMuted}
                title="Post anonymously"
                detail={`Neighbours see “${profile.username}”.`}
                value={anonymous}
                onChange={setAnonymous}
              />
            </View>
          </Step>
        </ScrollView>

        <View
          style={[
            styles.footer,
            { paddingBottom: Math.max(insets.bottom, space.lg) },
          ]}
        >
          <PressableScale
            haptic
            onPress={submit}
            accessibilityState={{ disabled: !ready }}
            style={[styles.submit, !ready && styles.submitIdle]}
          >
            <Ionicons
              name="paper-plane"
              size={18}
              color={ready ? colors.onAccent : colors.textMuted}
            />
            <Text
              style={[
                type.callout,
                styles.strong,
                { color: ready ? colors.onAccent : colors.textMuted },
              ]}
            >
              Share with neighbours
            </Text>
          </PressableScale>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.step}>
      <View style={styles.stepHeader}>
        <View style={styles.stepNumber}>
          <Text style={[type.caption, { color: colors.accent }]}>{number}</Text>
        </View>
        <Text style={[type.headline, { color: colors.text }]}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function PhotoButton({
  icon,
  label,
  onPress,
}: {
  icon: "camera" | "images";
  label: string;
  onPress: () => void;
}) {
  return (
    <PressableScale onPress={onPress} style={styles.photoButton}>
      <Ionicons name={icon} size={20} color={colors.text} />
      <Text style={[type.callout, { color: colors.text }]}>{label}</Text>
    </PressableScale>
  );
}

function ToggleRow({
  icon,
  iconColor,
  title,
  detail,
  value,
  onChange,
}: {
  icon: "alert-circle" | "eye-off";
  iconColor: string;
  title: string;
  detail: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.toggleRow}>
      <Ionicons name={icon} size={20} color={iconColor} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={[type.callout, styles.strong]}>{title}</Text>
        <Text style={[type.caption, { color: colors.textMuted }]}>
          {detail}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.surfaceRaised, true: colors.accent }}
        accessibilityLabel={title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: space.gutter,
    paddingTop: space.xxl,
    paddingBottom: space.sm,
  },
  close: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceRaised,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: space.gutter,
    paddingTop: space.lg,
    paddingBottom: space.xxxl,
    gap: space.xxxl,
  },
  step: {
    gap: space.md,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    marginBottom: space.xs,
  },
  stepNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: tint(colors.accent, 0.14),
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space.sm,
  },
  tile: {
    width: "48.8%",
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    padding: space.md,
    minHeight: 64,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  tileIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  strong: {
    color: colors.text,
    fontFamily: "Inter-SemiBold",
  },
  areaChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    height: 36,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceRaised,
  },
  areaChipSelected: {
    backgroundColor: colors.accent,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    minHeight: 52,
    paddingHorizontal: space.lg,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    color: colors.text,
  },
  input: {
    flex: 1,
    color: colors.text,
    paddingVertical: space.md,
  },
  suggestions: {
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    overflow: "hidden",
  },
  suggestion: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
  },
  textArea: {
    minHeight: 120,
    paddingTop: space.md,
    paddingBottom: space.md,
  },
  photoRow: {
    flexDirection: "row",
    gap: space.sm,
  },
  photoButton: {
    flex: 1,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: space.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(255,255,255,0.18)",
  },
  photo: {
    height: 180,
    borderRadius: radius.md,
  },
  removePhoto: {
    position: "absolute",
    top: space.sm,
    right: space.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.scrim,
    alignItems: "center",
    justifyContent: "center",
  },
  toggles: {
    borderRadius: radius.md,
    backgroundColor: colors.surfaceRaised,
    paddingHorizontal: space.lg,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    paddingVertical: space.lg,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.hairline,
  },
  footer: {
    paddingHorizontal: space.gutter,
    paddingTop: space.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
    backgroundColor: colors.surface,
  },
  submit: {
    height: 54,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: space.sm,
  },
  submitIdle: {
    backgroundColor: colors.surfaceRaised,
  },
});
