import {
  HighlightTile,
  IncidentCard,
  IncidentHeroCard,
  ReportTile,
} from "@/components/incident";
import { Chip, IconButton, SectionHeader } from "@/components/ui/primitives";
import { PressableScale } from "@/components/ui/PressableScale";
import { greeting, IncidentCategory } from "@/data/sample";
import { useSampleStore } from "@/data/store";
import { showToast } from "@/lib/toast";
import { colors, space, TAB_BAR_CLEARANCE, type } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Filter = "all" | IncidentCategory;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "safety", label: "Safety" },
  { key: "suspicious", label: "Suspicious" },
  { key: "theft", label: "Theft" },
  { key: "lost-pet", label: "Lost & found" },
  { key: "community", label: "Community" },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { incidents, profile } = useSampleStore();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = incidents.filter(
    (incident) => filter === "all" || incident.category === filter
  );
  const hero = visible.find(
    (incident) =>
      incident.image &&
      incident.status !== "resolved" &&
      (incident.severity === "urgent" || incident.severity === "high")
  );
  const feed = visible.filter((incident) => incident !== hero);
  // The latest unresolved reports, newest first.
  const nearbyNow = incidents
    .filter((incident) => incident.status !== "resolved")
    .slice(0, 6);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{
        paddingTop: insets.top + space.sm,
        paddingBottom: TAB_BAR_CLEARANCE,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={{ flex: 1, gap: space.sm }}>
          <PressableScale
            accessibilityLabel={`Neighbourhood: ${profile.region}`}
            accessibilityHint="Choosing a neighbourhood is not part of the concept"
            onPress={() => showToast("info", "One neighbourhood in this concept")}
            style={styles.place}
          >
            <Ionicons name="location" size={14} color={colors.accent} />
            <Text style={[type.callout, { color: colors.textMuted }]}>
              {profile.region}
            </Text>
            <Ionicons name="chevron-down" size={14} color={colors.textMuted} />
          </PressableScale>
          <Text
            style={[type.display, { color: colors.text }]}
            accessibilityRole="header"
          >
            {greeting()}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <IconButton icon="search" label="Search" />
          <IconButton icon="notifications-outline" label="Notifications" badge />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.highlights}
        accessibilityLabel="Nearby now"
      >
        <ReportTile />
        {nearbyNow.map((incident) => (
          <HighlightTile key={incident.id} incident={incident} />
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        {filters.map(({ key, label }) => (
          <Chip
            key={key}
            label={label}
            selected={filter === key}
            onPress={() => setFilter(key)}
          />
        ))}
      </ScrollView>

      {hero && (
        <View style={styles.section}>
          <SectionHeader title="Needs attention" />
          <IncidentHeroCard incident={hero} />
        </View>
      )}

      <View style={styles.section}>
        <SectionHeader
          title="Around you"
          action={
            <Text style={[type.caption, { color: colors.textMuted }]}>
              {feed.length} {feed.length === 1 ? "report" : "reports"}
            </Text>
          }
        />
        <View style={{ gap: space.lg }}>
          {feed.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
          {feed.length === 0 && (
            <Text style={[type.body, styles.empty]}>
              Nothing reported here. Quiet is good.
            </Text>
          )}
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
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: space.gutter,
    gap: space.md,
  },
  place: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
  },
  headerActions: {
    flexDirection: "row",
    gap: space.sm,
    paddingBottom: 2,
  },
  highlights: {
    gap: space.md,
    paddingHorizontal: space.gutter,
    paddingTop: space.xxl,
  },
  filters: {
    gap: space.sm,
    paddingHorizontal: space.gutter,
    paddingVertical: space.xl,
  },
  section: {
    marginBottom: space.xxl,
  },
  empty: {
    color: colors.textMuted,
    textAlign: "center",
    paddingVertical: space.xxxl,
  },
});
