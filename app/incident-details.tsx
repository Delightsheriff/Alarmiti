import { StatusSteps, UpdatesTimeline } from "@/components/incident";
import { MapPreview } from "@/components/MapPreview";
import { IconButton, SeverityBadge } from "@/components/ui/primitives";
import { PressableScale } from "@/components/ui/PressableScale";
import { categories, formatRelativeTime } from "@/data/sample";
import { useConfirmations, useIncident, useSampleStore } from "@/data/store";
import { showToast } from "@/lib/toast";
import { colors, radius, space, type } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Share, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HERO_HEIGHT = 340;

export default function IncidentDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const incident = useIncident(id);

  if (!incident) {
    return (
      <View style={[styles.missing, { paddingTop: insets.top }]}>
        <Ionicons name="document-text-outline" size={48} color={colors.textMuted} />
        <Text style={[type.body, { color: colors.textMuted }]}>
          This incident isn&apos;t available.
        </Text>
        <PressableScale onPress={() => router.back()} style={styles.secondary}>
          <Text style={[type.callout, { color: colors.text }]}>Go back</Text>
        </PressableScale>
      </View>
    );
  }

  return <IncidentDetails incident={incident} />;
}

function IncidentDetails({
  incident,
}: {
  incident: NonNullable<ReturnType<typeof useIncident>>;
}) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { toggleConfirm } = useSampleStore();
  const { count, mine } = useConfirmations(incident);
  const [following, setFollowing] = useState(false);
  const category = categories[incident.category];

  const share = () =>
    Share.share({
      message: `${incident.title} · ${incident.location}. Shared from Alarmiti.`,
    });

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}
      >
        <View style={{ height: HERO_HEIGHT }}>
          {incident.image ? (
            <Image
              source={incident.image}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              transition={200}
              accessibilityLabel={`Photo attached to ${incident.title}`}
            />
          ) : (
            <MapPreview level={incident.severity} style={StyleSheet.absoluteFill} />
          )}
          <LinearGradient
            colors={["rgba(14,22,36,0.55)", "transparent", "transparent", colors.bg]}
            locations={[0, 0.3, 0.55, 1]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          <View style={styles.heroBadges}>
            <SeverityBadge level={incident.severity} solid />
            <View style={styles.categoryChip}>
              <Ionicons name={category.icon} size={12} color={colors.text} />
              <Text style={[type.caption, { color: colors.text }]}>
                {category.label}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={{ gap: space.sm }}>
            <Text
              style={[type.title, { color: colors.text }]}
              accessibilityRole="header"
            >
              {incident.title}
            </Text>
            <Text style={[type.callout, { color: colors.textMuted }]}>
              {incident.location} · {formatRelativeTime(incident.reportedAt)} ·{" "}
              {incident.reporter}
            </Text>
          </View>

          <StatusSteps status={incident.status} />

          <Text style={[type.body, { color: colors.text }]}>
            {incident.description}
          </Text>

          <View style={styles.section}>
            <Text style={[type.overline, { color: colors.textFaint }]}>
              Updates
            </Text>
            <UpdatesTimeline updates={incident.updates} />
          </View>

          <View style={styles.section}>
            <Text style={[type.overline, { color: colors.textFaint }]}>
              Where
            </Text>
            <View style={styles.locationCard}>
              <MapPreview
                level={incident.severity}
                areaSize={96}
                style={styles.locationMap}
              />
              <View style={styles.locationMeta}>
                <Text style={[type.callout, styles.strong]}>{incident.location}</Text>
                <Text style={[type.caption, { color: colors.textMuted }]}>
                  Only the general area is shared, never an exact address.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <LinearGradient
        colors={[colors.bg, "rgba(14,22,36,0.7)", "transparent"]}
        style={[styles.topFade, { height: insets.top + 100 }]}
        pointerEvents="none"
      />
      <View style={[styles.topBar, { top: insets.top + space.xs }]}>
        <IconButton
          icon="chevron-back"
          label="Go back"
          variant="glass"
          onPress={() => router.back()}
        />
        <View style={{ flexDirection: "row", gap: space.sm }}>
          <IconButton icon="share-outline" label="Share" variant="glass" onPress={share} />
          <IconButton
            icon={following ? "bookmark" : "bookmark-outline"}
            label={following ? "Stop following" : "Follow updates"}
            variant="glass"
            onPress={() => {
              setFollowing(!following);
              showToast(
                "success",
                following ? "Stopped following" : "You'll get updates on this"
              );
            }}
          />
        </View>
      </View>

      <BlurView
        intensity={40}
        tint="dark"
        style={[styles.actionBar, { paddingBottom: Math.max(insets.bottom, space.lg) }]}
      >
        <PressableScale
          haptic
          onPress={() => toggleConfirm(incident.id)}
          accessibilityState={{ selected: mine }}
          accessibilityLabel={mine ? "Remove your confirmation" : "I saw this too"}
          style={[styles.primary, mine && styles.primaryDone]}
        >
          <Ionicons
            name={mine ? "checkmark-circle" : "eye"}
            size={18}
            color={mine ? colors.accent : colors.onAccent}
          />
          <Text
            style={[
              type.callout,
              styles.strong,
              { color: mine ? colors.accent : colors.onAccent },
            ]}
          >
            {mine ? `You confirmed · ${count}` : `I saw this too · ${count}`}
          </Text>
        </PressableScale>
        <PressableScale
          onPress={() => showToast("info", "Adding updates isn't part of the concept")}
          style={styles.secondary}
          accessibilityLabel="Add update"
        >
          <Ionicons name="add" size={18} color={colors.text} />
          <Text style={[type.callout, styles.strong]}>Update</Text>
        </PressableScale>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  heroBadges: {
    position: "absolute",
    left: space.gutter,
    bottom: space.lg,
    flexDirection: "row",
    gap: space.sm,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.glass,
  },
  body: {
    paddingHorizontal: space.gutter,
    paddingTop: space.sm,
    gap: space.xxl,
  },
  section: {
    gap: space.lg,
  },
  locationCard: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  locationMap: {
    height: 150,
  },
  locationMeta: {
    padding: space.lg,
    gap: 4,
  },
  strong: {
    color: colors.text,
    fontFamily: "Inter-SemiBold",
  },
  topFade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  topBar: {
    position: "absolute",
    left: space.gutter,
    right: space.gutter,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: space.md,
    paddingHorizontal: space.gutter,
    paddingTop: space.lg,
    backgroundColor: "rgba(14, 22, 36, 0.7)",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
  },
  primary: {
    flex: 1,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: space.sm,
  },
  primaryDone: {
    backgroundColor: "rgba(124, 242, 200, 0.14)",
  },
  secondary: {
    height: 52,
    paddingHorizontal: space.xl,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceRaised,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  missing: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: space.md,
    backgroundColor: colors.bg,
  },
});
