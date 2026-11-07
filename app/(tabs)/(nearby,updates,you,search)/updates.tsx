import { IncidentRow } from "@/components/incidents";
import { Section } from "@/components/list";
import { dayLabel, IncidentStatus, statusLabels } from "@/data/sample";
import { useSampleStore } from "@/data/store";
import { Stack } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";

const statuses: IncidentStatus[] = ["open", "monitoring", "resolved"];

export default function UpdatesScreen() {
  const { incidents } = useSampleStore();
  const [status, setStatus] = useState<IncidentStatus | null>(null);

  // Newest first, grouped under Today, Yesterday and weekday headers.
  const days = new Map<string, typeof incidents>();
  [...incidents]
    .filter((incident) => !status || incident.status === status)
    .sort((a, b) => b.reportedAt.getTime() - a.reportedAt.getTime())
    .forEach((incident) => {
      const label = dayLabel(incident.reportedAt);
      days.set(label, [...(days.get(label) ?? []), incident]);
    });

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Menu
          icon="line.3.horizontal.decrease"
          title="Show"
          accessibilityLabel="Filter by status"
        >
          <Stack.Toolbar.MenuAction
            isOn={!status}
            onPress={() => setStatus(null)}
          >
            Everything
          </Stack.Toolbar.MenuAction>
          {statuses.map((key) => (
            <Stack.Toolbar.MenuAction
              key={key}

              isOn={status === key}
              onPress={() => setStatus(key)}
            >
              {statusLabels[key]}
            </Stack.Toolbar.MenuAction>
          ))}
        </Stack.Toolbar.Menu>
      </Stack.Toolbar>

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {[...days].map(([day, items]) => (
          <Section key={day} header={day} inset={60}>
            {items.map((incident) => (
              <IncidentRow key={incident.id} incident={incident} />
            ))}
          </Section>
        ))}
        {days.size === 0 && (
          <Section footer="Nothing with this status right now.">{null}</Section>
        )}
      </ScrollView>
    </>
  );
}
