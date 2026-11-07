import { IconTile, styles as list } from "@/components/list";
import {
  categories,
  formatDistance,
  formatRelativeTime,
  Incident,
  severity,
} from "@/data/sample";
import { useSampleStore } from "@/data/store";
import { CARD_RADIUS, color, text } from "@/theme/system";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { ReactNode, useState } from "react";
import { GestureResponderEvent, Pressable, PressableProps, Share, StyleSheet, Text, View } from "react-native";

export const incidentHref = (id: string) => ({
  pathname: "/incident/[id]" as const,
  params: { id },
});

export const shareIncident = (incident: Incident) =>
  Share.share({ message: `${incident.title} · ${incident.location}. Shared from Alarmiti.` });

export const incidentMeta = (incident: Incident) =>
  `${incident.location} · ${formatDistance(incident.distanceKm)} · ${formatRelativeTime(incident.reportedAt)}`;

/**
 * Opens the incident on tap. A long press shows a preview of it with
 * quick actions, as links do in Mail and Safari.
 */
function IncidentLink({ incident, children }: { incident: Incident; children: ReactNode }) {
  const { confirmed, followed, toggleConfirm, toggleFollow } = useSampleStore();
  const isFollowed = followed.has(incident.id);
  return (
    <Link href={incidentHref(incident.id)} asChild>
      <Link.Trigger>{children}</Link.Trigger>
      <Link.Preview />
      <Link.Menu>
        <Link.MenuAction
          title="I Saw This Too"
          icon="eye"
          isOn={confirmed.has(incident.id)}
          onPress={() => toggleConfirm(incident.id)}
        />
        <Link.MenuAction
          title={isFollowed ? "Unfollow" : "Follow"}
          icon={isFollowed ? "bell.slash" : "bell"}
          onPress={() => toggleFollow(incident.id)}
        />
        <Link.MenuAction
          title="Share"
          icon="square.and.arrow.up"
          onPress={() => shareIncident(incident)}
        />
      </Link.Menu>
    </Link>
  );
}

/**
 * Pressed state kept in React rather than a style function, because `Link`
 * hands its child's style to a Slot, which takes only one flat style object.
 */
function usePressed({ onPressIn, onPressOut }: PressableProps) {
  const [pressed, setPressed] = useState(false);
  return {
    pressed,
    handlers: {
      onPressIn: (event: GestureResponderEvent) => {
        setPressed(true);
        onPressIn?.(event);
      },
      onPressOut: (event: GestureResponderEvent) => {
        setPressed(false);
        onPressOut?.(event);
      },
    },
  };
}

function SeverityLabel({ incident }: { incident: Incident }) {
  const level = incident.status === "resolved" ? null : severity[incident.severity];
  return (
    <Text style={[text.footnote, styles.severity, { color: level?.color ?? color.green }]}>
      {level ? level.label : "Resolved"}
    </Text>
  );
}

/** A list row: category tile, severity, title and where, with a photo if there is one. */
export function IncidentRow({ incident, ...pressable }: { incident: Incident } & PressableProps) {
  const category = categories[incident.category];
  const { pressed, handlers } = usePressed(pressable);
  return (
    <IncidentLink incident={incident}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${incident.title}, ${incidentMeta(incident)}`}
        {...pressable}
        {...handlers}
        style={StyleSheet.flatten([list.row, styles.incidentRow, pressed && { backgroundColor: color.cellPressed }])}
      >
        <IconTile symbol={category.symbol} tile={category.tile} />
        <View style={list.rowText}>
          <SeverityLabel incident={incident} />
          <Text numberOfLines={2} style={[text.headline, { color: color.label }]}>
            {incident.title}
          </Text>
          <Text numberOfLines={1} style={[text.subheadline, { color: color.secondaryLabel }]}>
            {incidentMeta(incident)}
          </Text>
        </View>
        {incident.image ? (
          <Image source={incident.image} style={styles.thumbnail} contentFit="cover" />
        ) : (
          <SymbolView name="chevron.right" size={13} weight="semibold" tintColor={color.tertiaryLabel} />
        )}
      </Pressable>
    </IncidentLink>
  );
}

/** The most pressing report, as a photo card. */
export function FeaturedIncident({ incident, ...pressable }: { incident: Incident } & PressableProps) {
  const { pressed, handlers } = usePressed(pressable);
  return (
    <IncidentLink incident={incident}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${incident.title}, ${incidentMeta(incident)}`}
        {...pressable}
        {...handlers}
        style={StyleSheet.flatten([styles.featured, pressed && { opacity: 0.85 }])}
      >
        {incident.image && (
          <Image source={incident.image} style={styles.featuredImage} contentFit="cover" />
        )}
        <View style={styles.featuredBody}>
          <SeverityLabel incident={incident} />
          <Text style={[text.title3, { color: color.label }]}>{incident.title}</Text>
          <Text style={[text.subheadline, { color: color.secondaryLabel }]}>
            {incidentMeta(incident)}
          </Text>
        </View>
      </Pressable>
    </IncidentLink>
  );
}

const styles = StyleSheet.create({
  incidentRow: {
    alignItems: "center",
    backgroundColor: color.cell,
  },
  severity: {
    fontWeight: "600",
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderCurve: "continuous",
  },
  featured: {
    marginHorizontal: 16,
    marginBottom: 32,
    borderRadius: CARD_RADIUS,
    borderCurve: "continuous",
    backgroundColor: color.cell,
    overflow: "hidden",
  },
  featuredImage: {
    aspectRatio: 16 / 10,
    width: "100%",
  },
  featuredBody: {
    padding: 16,
    gap: 3,
  },
});
