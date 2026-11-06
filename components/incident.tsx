import { IconTile, SeverityBadge } from "@/components/ui/primitives";
import { PressableScale } from "@/components/ui/PressableScale";
import {
  categories,
  formatDistance,
  formatRelativeTime,
  formatClockTime,
  Incident,
  IncidentStatus,
  IncidentUpdate,
  statusLabels,
} from "@/data/sample";
import { useConfirmations, useSampleStore } from "@/data/store";
import { colors, radius, severity, space, tint, type } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";

const useOpenIncident = () => {
  const router = useRouter();
  return (id: string) =>
    router.push({ pathname: "/incident-details", params: { id } });
};

const metaLine = (incident: Incident) =>
  `${incident.location} · ${formatDistance(incident.distanceKm)} · ${formatRelativeTime(
    incident.reportedAt
  )}`;

export function StatusTag({ status }: { status: IncidentStatus }) {
  const color =
    status === "resolved"
      ? severity.low.color
      : status === "monitoring"
      ? severity.medium.color
      : colors.textMuted;
  return (
    <View style={[styles.statusTag, { borderColor: tint(color, 0.4) }]}>
      {status === "resolved" && (
        <Ionicons name="checkmark" size={12} color={color} />
      )}
      <Text style={[type.caption, { color }]}>{statusLabels[status]}</Text>
    </View>
  );
}

export function ConfirmButton({ incident }: { incident: Incident }) {
  const { toggleConfirm } = useSampleStore();
  const { count, mine } = useConfirmations(incident);
  return (
    <PressableScale
      haptic
      scaleTo={0.94}
      onPress={() => toggleConfirm(incident.id)}
      accessibilityLabel={mine ? "Remove your confirmation" : "I saw this too"}
      accessibilityState={{ selected: mine }}
      style={[styles.confirm, mine && styles.confirmMine]}
    >
      <Ionicons
        name={mine ? "checkmark-circle" : "checkmark-circle-outline"}
        size={16}
        color={mine ? colors.onAccent : colors.text}
      />
      <Text
        style={[type.callout, { color: mine ? colors.onAccent : colors.text }]}
      >
        {mine ? "Confirmed" : "Confirm"} · {count}
      </Text>
    </PressableScale>
  );
}

/** The top incident, full width with its photo behind the title. */
export function IncidentHeroCard({ incident }: { incident: Incident }) {
  const open = useOpenIncident();
  const category = categories[incident.category];
  return (
    <PressableScale
      scaleTo={0.98}
      onPress={() => open(incident.id)}
      accessibilityLabel={`${severity[incident.severity].label}: ${incident.title}`}
      accessibilityHint="Opens the incident"
      style={styles.hero}
    >
      {incident.image && (
        <Image
          source={incident.image}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={200}
        />
      )}
      <LinearGradient
        colors={["rgba(8,12,20,0.05)", "rgba(8,12,20,0.35)", colors.scrim]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.heroTop}>
        <SeverityBadge level={incident.severity} solid />
        <View style={styles.heroCategory}>
          <Ionicons name={category.icon} size={12} color={colors.text} />
          <Text style={[type.caption, { color: colors.text }]}>
            {category.short}
          </Text>
        </View>
      </View>
      <View style={styles.heroBottom}>
        <Text style={[type.title, { color: colors.onImage }]} numberOfLines={2}>
          {incident.title}
        </Text>
        <Text style={[type.callout, { color: colors.onImageMuted }]}>
          {metaLine(incident)}
        </Text>
      </View>
    </PressableScale>
  );
}

/** A feed card: photo first when there is one, otherwise a compact card. */
export function IncidentCard({ incident }: { incident: Incident }) {
  const open = useOpenIncident();
  const category = categories[incident.category];
  return (
    <PressableScale
      scaleTo={0.98}
      onPress={() => open(incident.id)}
      accessibilityLabel={incident.title}
      accessibilityHint="Opens the incident"
      style={styles.card}
    >
      {incident.image ? (
        <View>
          <Image
            source={incident.image}
            style={styles.cardImage}
            contentFit="cover"
            transition={200}
          />
          <View style={styles.cardImageBadge}>
            <SeverityBadge level={incident.severity} solid />
          </View>
        </View>
      ) : null}
      <View style={styles.cardBody}>
        <View style={styles.cardTitleRow}>
          {!incident.image && (
            <IconTile icon={category.icon} level={incident.severity} size={40} />
          )}
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={[type.headline, { color: colors.text }]} numberOfLines={2}>
              {incident.title}
            </Text>
            <Text style={[type.caption, { color: colors.textMuted }]}>
              {metaLine(incident)}
            </Text>
          </View>
        </View>
        <Text
          style={[type.callout, { color: colors.textMuted }]}
          numberOfLines={2}
        >
          {incident.description}
        </Text>
        <View style={styles.cardActions}>
          <ConfirmButton incident={incident} />
          <StatusTag status={incident.status} />
        </View>
      </View>
    </PressableScale>
  );
}

/** A compact list row for timelines and the profile. */
export function IncidentRow({ incident }: { incident: Incident }) {
  const open = useOpenIncident();
  const category = categories[incident.category];
  return (
    <PressableScale
      scaleTo={0.98}
      onPress={() => open(incident.id)}
      accessibilityLabel={`${category.label}: ${incident.title}, ${statusLabels[incident.status]}`}
      style={styles.row}
    >
      <IconTile icon={category.icon} level={incident.severity} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={[type.callout, styles.rowTitle]} numberOfLines={1}>
          {incident.title}
        </Text>
        <Text style={[type.caption, { color: colors.textMuted }]} numberOfLines={1}>
          {incident.location} · {formatRelativeTime(incident.reportedAt)}
        </Text>
      </View>
      <StatusTag status={incident.status} />
    </PressableScale>
  );
}

const statusOrder: IncidentStatus[] = ["open", "monitoring", "resolved"];

/** Open → Monitoring → Resolved as three steps. */
export function StatusSteps({ status }: { status: IncidentStatus }) {
  const current = statusOrder.indexOf(status);
  return (
    <View
      style={styles.steps}
      accessible
      accessibilityLabel={`Status: ${statusLabels[status]}`}
    >
      {statusOrder.map((step, index) => {
        const reached = index <= current;
        return (
          <View key={step} style={{ flex: 1, gap: 6 }}>
            <View
              style={[
                styles.stepBar,
                reached && { backgroundColor: colors.accent },
              ]}
            />
            <Text
              style={[
                type.caption,
                { color: index === current ? colors.text : colors.textFaint },
              ]}
            >
              {statusLabels[step]}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const updateIcons: Record<IncidentUpdate["kind"], ComponentProps<typeof Ionicons>["name"]> = {
  reported: "flag",
  confirmed: "people",
  official: "shield-checkmark",
  resolved: "checkmark-done",
};

/** A vertical line of dots, oldest first. */
export function UpdatesTimeline({ updates }: { updates: IncidentUpdate[] }) {
  return (
    <View>
      {updates.map((update, index) => {
        const last = index === updates.length - 1;
        const color =
          update.kind === "resolved" || update.kind === "official"
            ? colors.accent
            : colors.textMuted;
        return (
          <View key={index} style={styles.timelineRow}>
            <View style={styles.timelineRail}>
              <View style={[styles.timelineDot, { backgroundColor: tint(color, 0.18) }]}>
                <Ionicons name={updateIcons[update.kind]} size={13} color={color} />
              </View>
              {!last && <View style={styles.timelineLine} />}
            </View>
            <View style={[styles.timelineBody, last && { paddingBottom: 0 }]}>
              <Text style={[type.callout, { color: colors.text }]}>{update.text}</Text>
              <Text style={[type.caption, { color: colors.textFaint }]}>
                {formatClockTime(update.at)} · {formatRelativeTime(update.at)}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

/** A "Nearby now" tile: photo or icon inside a severity-coloured ring. */
export function HighlightTile({ incident }: { incident: Incident }) {
  const open = useOpenIncident();
  const category = categories[incident.category];
  const { color } = severity[incident.severity];
  return (
    <PressableScale
      scaleTo={0.95}
      onPress={() => open(incident.id)}
      accessibilityLabel={`${severity[incident.severity].label}: ${incident.title}`}
      style={styles.highlight}
    >
      <View style={[styles.highlightRing, { borderColor: color }]}>
        <View style={[styles.highlightInner, { backgroundColor: tint(color) }]}>
          {incident.image ? (
            <Image
              source={incident.image}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
            />
          ) : (
            <Ionicons name={category.icon} size={26} color={color} />
          )}
        </View>
      </View>
      <Text
        style={[type.caption, { color: colors.textMuted, textAlign: "center" }]}
        numberOfLines={1}
      >
        {category.short}
      </Text>
    </PressableScale>
  );
}

/** The first tile in the highlights row. */
export function ReportTile() {
  const router = useRouter();
  return (
    <PressableScale
      scaleTo={0.95}
      haptic
      onPress={() => router.push("/report-incident")}
      accessibilityLabel="Report an incident"
      style={styles.highlight}
    >
      <View style={[styles.highlightRing, styles.reportRing]}>
        <View style={[styles.highlightInner, { backgroundColor: colors.surface }]}>
          <Ionicons name="add" size={28} color={colors.accent} />
        </View>
      </View>
      <Text style={[type.caption, { color: colors.text, textAlign: "center" }]}>
        Report
      </Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  statusTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  confirm: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 34,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceRaised,
  },
  confirmMine: {
    backgroundColor: colors.accent,
  },
  hero: {
    height: 300,
    marginHorizontal: space.gutter,
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.surface,
    justifyContent: "space-between",
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    padding: space.lg,
  },
  heroCategory: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.glass,
  },
  heroBottom: {
    padding: space.xl,
    gap: 6,
  },
  card: {
    marginHorizontal: space.gutter,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  cardImage: {
    height: 180,
    width: "100%",
  },
  cardImageBadge: {
    position: "absolute",
    top: space.md,
    left: space.md,
  },
  cardBody: {
    padding: space.lg,
    gap: space.md,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: space.md,
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    paddingVertical: space.md,
    paddingHorizontal: space.gutter,
  },
  rowTitle: {
    color: colors.text,
    fontFamily: "Inter-SemiBold",
  },
  steps: {
    flexDirection: "row",
    gap: space.sm,
  },
  stepBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceRaised,
  },
  timelineRow: {
    flexDirection: "row",
    gap: space.md,
  },
  timelineRail: {
    alignItems: "center",
    width: 28,
  },
  timelineDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  timelineLine: {
    flex: 1,
    width: 2,
    marginVertical: 4,
    borderRadius: 1,
    backgroundColor: colors.hairline,
  },
  timelineBody: {
    flex: 1,
    gap: 2,
    paddingTop: 4,
    paddingBottom: space.xl,
  },
  highlight: {
    width: 76,
    gap: 6,
  },
  highlightRing: {
    width: 76,
    height: 96,
    borderRadius: 22,
    borderWidth: 2,
    padding: 3,
  },
  reportRing: {
    borderColor: "rgba(17,17,19,0.18)",
    borderStyle: "dashed",
  },
  highlightInner: {
    flex: 1,
    borderRadius: 17,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
