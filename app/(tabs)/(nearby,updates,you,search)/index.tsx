import { FeaturedIncident, IncidentRow } from "@/components/incidents";
import { Section, SectionHeader } from "@/components/list";
import { categories, IncidentCategory } from "@/data/sample";
import { useSampleStore } from "@/data/store";
import { color, text } from "@/theme/system";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

const filters: IncidentCategory[] = [
  "safety",
  "suspicious",
  "theft",
  "lost-pet",
  "community",
];

export default function NearbyScreen() {
  const { incidents, profile } = useSampleStore();
  const [filter, setFilter] = useState<IncidentCategory | null>(null);

  const visible = incidents.filter(
    (incident) => !filter || incident.category === filter,
  );
  const featured = visible.find(
    (incident) =>
      incident.image &&
      incident.status !== "resolved" &&
      (incident.severity === "urgent" || incident.severity === "high"),
  );
  const rest = visible.filter((incident) => incident !== featured);
  const open = incidents.filter(
    (incident) => incident.status !== "resolved",
  ).length;

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Menu
          icon="line.3.horizontal.decrease"
          title="Show"
          accessibilityLabel="Filter reports"
        >
          <Stack.Toolbar.MenuAction
            isOn={!filter}
            onPress={() => setFilter(null)}
          >
            All Reports
          </Stack.Toolbar.MenuAction>
          {filters.map((key) => (
            <Stack.Toolbar.MenuAction
              key={key}

              icon={categories[key].symbol}
              isOn={filter === key}
              onPress={() => setFilter(key)}
            >
              {categories[key].short}
            </Stack.Toolbar.MenuAction>
          ))}
        </Stack.Toolbar.Menu>
        <Stack.Toolbar.Button
          icon="plus"
          accessibilityLabel="Report something"
          onPress={() => router.push("/report")}
        />
      </Stack.Toolbar>

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.context}>
          {profile.region} · {open} open {open === 1 ? "report" : "reports"}
        </Text>

        {featured && (
          <>
            <SectionHeader>Needs attention</SectionHeader>
            <FeaturedIncident incident={featured} />
          </>
        )}

        <Section
          header={filter ? categories[filter].label : "Around you"}
          footer={rest.length === 0 ? "Nothing else reported here." : undefined}
          inset={60}
        >
          {rest.map((incident) => (
            <IncidentRow key={incident.id} incident={incident} />
          ))}
        </Section>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  context: {
    ...text.subheadline,
    color: color.secondaryLabel,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 20,
  },
});
