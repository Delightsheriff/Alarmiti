import { IncidentRow } from "@/components/incident";
import { Chip } from "@/components/ui/primitives";
import { PressableScale } from "@/components/ui/PressableScale";
import { categories, dayLabel, Incident, IncidentStatus } from "@/data/sample";
import { useSampleStore } from "@/data/store";
import { colors, radius, space, TAB_BAR_CLEARANCE, type } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Filter = "all" | IncidentStatus;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "Everything" },
  { key: "open", label: "Open" },
  { key: "monitoring", label: "Monitoring" },
  { key: "resolved", label: "Resolved" },
];

/** Groups incidents under Today, Yesterday and weekday headers. */
const groupByDay = (incidents: Incident[]) => {
  const groups = new Map<string, Incident[]>();
  for (const incident of incidents) {
    const label = dayLabel(incident.reportedAt);
    groups.set(label, [...(groups.get(label) ?? []), incident]);
  }
  return [...groups].map(([title, data]) => ({ title, data }));
};

export default function UpdatesScreen() {
  const insets = useSafeAreaInsets();
  const { incidents } = useSampleStore();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const search = query.trim().toLowerCase();
  const matches = incidents.filter(
    (incident) =>
      (filter === "all" || incident.status === filter) &&
      [
        incident.title,
        incident.reporter,
        incident.location,
        categories[incident.category].label,
      ].some((field) => field.toLowerCase().includes(search)),
  );
  const resolvedCount = incidents.filter(
    (incident) => incident.status === "resolved",
  ).length;

  return (
    <View style={[styles.screen, { paddingTop: insets.top + space.sm }]}>
      <View style={styles.header}>
        <Text
          style={[type.display, { color: colors.text }]}
          accessibilityRole="header"
        >
          Updates
        </Text>
        <Text style={[type.callout, { color: colors.textMuted }]}>
          Everything around you, including what got fixed. {resolvedCount}{" "}
          {resolvedCount === 1 ? "report" : "reports"} resolved lately.
        </Text>
        <View style={styles.search}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            style={[type.body, styles.searchInput]}
            placeholder="Search streets, types, neighbours"
            placeholderTextColor={colors.textFaint}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            accessibilityLabel="Search updates"
          />
          {query.length > 0 && (
            <PressableScale
              onPress={() => setQuery("")}
              accessibilityLabel="Clear search"
            >
              <Ionicons
                name="close-circle"
                size={18}
                color={colors.textMuted}
              />
            </PressableScale>
          )}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
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
      </View>

      <SectionList
        sections={groupByDay(matches)}
        keyExtractor={(incident) => incident.id}
        renderItem={({ item }) => <IncidentRow incident={item} />}
        renderSectionHeader={({ section }) => (
          <View style={styles.dayHeader}>
            <Text style={[type.overline, { color: colors.textFaint }]}>
              {section.title}
            </Text>
          </View>
        )}
        stickySectionHeadersEnabled
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: TAB_BAR_CLEARANCE }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search" size={32} color={colors.textFaint} />
            <Text style={[type.body, { color: colors.textMuted }]}>
              No updates match that.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    paddingHorizontal: space.gutter,
    gap: space.md,
    paddingBottom: space.sm,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    height: 48,
    marginTop: space.sm,
    paddingHorizontal: space.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
  },
  filtersScroll: {
    marginHorizontal: -space.gutter,
  },
  filters: {
    gap: space.sm,
    paddingHorizontal: space.gutter,
  },
  dayHeader: {
    paddingHorizontal: space.gutter,
    paddingTop: space.xl,
    paddingBottom: space.sm,
    backgroundColor: colors.bg,
  },
  empty: {
    alignItems: "center",
    gap: space.md,
    paddingTop: space.xxxl * 2,
  },
});
