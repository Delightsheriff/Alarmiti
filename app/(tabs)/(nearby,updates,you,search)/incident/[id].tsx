import { shareIncident } from "@/components/incidents";
import { Row, Section, TextCell } from "@/components/list";
import {
  categories,
  formatClockTime,
  formatRelativeTime,
  IncidentUpdate,
  severity,
  statusLabels,
} from "@/data/sample";
import { useIncident, useSampleStore } from "@/data/store";
import { CARD_RADIUS, color, text } from "@/theme/system";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { Stack, useIsPreview, useLocalSearchParams } from "expo-router";
import { ColorValue, ScrollView, StyleSheet, Text, View } from "react-native";
import type { SFSymbol } from "sf-symbols-typescript";

const updateIcons: Record<
  IncidentUpdate["kind"],
  { symbol: SFSymbol; tile: ColorValue }
> = {
  reported: { symbol: "flag.fill", tile: color.gray },
  confirmed: { symbol: "person.2.fill", tile: color.blue },
  official: { symbol: "checkmark.seal.fill", tile: color.indigo },
  resolved: { symbol: "checkmark.circle.fill", tile: color.green },
};

export default function IncidentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const incident = useIncident(id);
  const { confirmed, followed, toggleConfirm, toggleFollow } = useSampleStore();
  // A long press on a link renders this screen as a preview, which has no header to set.
  const isPreview = useIsPreview();

  if (!incident) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Section footer="This report is no longer available.">{null}</Section>
      </ScrollView>
    );
  }

  const category = categories[incident.category];
  const level = severity[incident.severity];
  const mine = confirmed.has(incident.id);
  const seenBy = incident.confirmations + (mine ? 1 : 0);
  const isFollowed = followed.has(incident.id);

  const confirm = () => {
    if (!mine)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    toggleConfirm(incident.id);
  };

  return (
    <>
      {!isPreview && (
        <>
          <Stack.Screen options={{ title: category.short }} />
          <Stack.Toolbar placement="right">
            <Stack.Toolbar.Button
              icon={isFollowed ? "bell.fill" : "bell"}
              accessibilityLabel={isFollowed ? "Unfollow" : "Follow"}
              selected={isFollowed}
              onPress={() => toggleFollow(incident.id)}
            />
            <Stack.Toolbar.Button
              icon="square.and.arrow.up"
              accessibilityLabel="Share"
              onPress={() => shareIncident(incident)}
            />
          </Stack.Toolbar>
        </>
      )}

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.screen}
        contentContainerStyle={styles.content}
      >
        {incident.image && (
          <Image
            source={incident.image}
            style={styles.photo}
            contentFit="cover"
            accessibilityLabel={`Photo attached to ${incident.title}`}
          />
        )}

        <View style={styles.titleBlock}>
          <Text
            style={[text.title2, { color: color.label }]}
            accessibilityRole="header"
          >
            {incident.title}
          </Text>
          <Text style={[text.subheadline, { color: color.secondaryLabel }]}>
            {incident.location} · {formatRelativeTime(incident.reportedAt)}
          </Text>
        </View>

        <Section>
          <Row title="Status" detail={statusLabels[incident.status]} />
          <Row
            title="Severity"
            detail={level.label}
            detailColor={
              incident.status === "resolved" ? undefined : level.color
            }
          />
          <Row title="Category" detail={category.label} />
          <Row title="Reported by" detail={incident.reporter} />
          <Row
            title="Seen by"
            detail={`${seenBy} ${seenBy === 1 ? "neighbour" : "neighbours"}`}
          />
        </Section>

        {incident.status !== "resolved" && (
          <Section
            inset={60}
            footer={
              mine
                ? "Thanks. Neighbours can see this has been confirmed."
                : undefined
            }
          >
            <Row
              symbol={mine ? "eye.fill" : "eye"}
              tile={color.blue}
              title={mine ? "You Saw This" : "I Saw This Too"}
              action
              accessory={mine ? "check" : "none"}
              onPress={confirm}
            />
          </Section>
        )}

        <Section header="Details">
          <TextCell>{incident.description}</TextCell>
        </Section>

        <Section header="Updates" inset={60}>
          {incident.updates.map((update, index) => (
            <Row
              key={index}
              symbol={updateIcons[update.kind].symbol}
              tile={updateIcons[update.kind].tile}
              title={update.text}
              titleLines={3}
              subtitle={`${formatClockTime(update.at)} · ${formatRelativeTime(update.at)}`}
            />
          ))}
        </Section>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  // Set here as well as on the stack, because a long-press preview renders
  // the screen without the stack's content style.
  screen: {
    backgroundColor: color.background,
  },
  content: {
    paddingTop: 8,
    paddingBottom: 40,
  },
  photo: {
    aspectRatio: 4 / 3,
    marginHorizontal: 16,
    borderRadius: CARD_RADIUS,
    borderCurve: "continuous",
  },
  titleBlock: {
    marginHorizontal: 32,
    marginTop: 20,
    marginBottom: 24,
    gap: 4,
  },
});
