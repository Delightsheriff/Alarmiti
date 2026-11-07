import { IncidentRow } from "@/components/incidents";
import { Row, Section } from "@/components/list";
import { myReportIds, neighbourhoods, sampleIncidents } from "@/data/sample";
import { useSampleStore } from "@/data/store";
import { color } from "@/theme/system";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { ActionSheetIOS, Alert, ScrollView, StyleSheet, Switch, View } from "react-native";

const sampleIds = new Set(sampleIncidents.map((incident) => incident.id));

function Avatar({ uri }: { uri?: string }) {
  return uri ? (
    <Image source={{ uri }} style={styles.avatar} accessibilityLabel="Your profile photo" />
  ) : (
    <View style={[styles.avatar, styles.avatarEmpty]}>
      <SymbolView name="person.fill" size={30} tintColor={color.white} />
    </View>
  );
}

export default function YouScreen() {
  const { incidents, profile, updateProfile } = useSampleStore();
  const [urgentAlerts, setUrgentAlerts] = useState(true);

  const name = profile.isAnonymous
    ? profile.username
    : `${profile.firstName} ${profile.lastName}`.trim() || profile.username;
  // The sample reports marked as yours, plus anything you've posted this session.
  const mine = incidents.filter(
    (incident) => myReportIds.includes(incident.id) || !sampleIds.has(incident.id),
  );

  const choosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) updateProfile({ avatarUri: result.assets[0].uri });
  };

  const editPhoto = () => {
    const options = profile.avatarUri
      ? ["Choose Photo", "Remove Photo", "Cancel"]
      : ["Choose Photo", "Cancel"];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.length - 1,
        destructiveButtonIndex: profile.avatarUri ? 1 : undefined,
      },
      (index) => {
        if (options[index] === "Choose Photo") choosePhoto();
        if (options[index] === "Remove Photo") updateProfile({ avatarUri: undefined });
      },
    );
  };

  const setAnonymous = (anonymous: boolean) => {
    if (anonymous) {
      updateProfile({ isAnonymous: true });
      return;
    }
    // Showing a name needs one, so ask for it before switching.
    Alert.prompt(
      "Your Name",
      "Neighbours will see this on your reports.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Save",
          isPreferred: true,
          onPress: (value?: string) => {
            const [firstName = "", ...rest] = (value ?? "").trim().split(/\s+/);
            if (!firstName) return;
            updateProfile({ isAnonymous: false, firstName, lastName: rest.join(" ") });
          },
        },
      ],
      "plain-text",
      `${profile.firstName} ${profile.lastName}`.trim(),
    );
  };

  const chooseNeighbourhood = () => {
    const options = [...neighbourhoods, "Cancel"];
    ActionSheetIOS.showActionSheetWithOptions(
      { title: "Your Neighbourhood", options, cancelButtonIndex: options.length - 1 },
      (index) => {
        if (index < neighbourhoods.length) updateProfile({ region: neighbourhoods[index] });
      },
    );
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Section>
        <Row
          leading={<Avatar uri={profile.avatarUri} />}
          title={name}
          subtitle={profile.region}
          accessory="chevron"
          accessibilityHint="Change your profile photo"
          onPress={editPhoto}
        />
      </Section>

      <Section header="Activity" inset={60}>
        <Row symbol="doc.text.fill" tile={color.blue} title="Reports" detail={String(profile.stats.reports)} />
        <Row
          symbol="eye.fill"
          tile={color.indigo}
          title="Confirmations"
          detail={String(profile.stats.confirmations)}
        />
        <Row
          symbol="heart.fill"
          tile={color.red}
          title="Neighbours Helped"
          detail={String(profile.stats.helped)}
        />
      </Section>

      <Section
        header="Privacy"
        inset={60}
        footer={
          profile.isAnonymous
            ? `Neighbours see you as ${profile.username}. Your name and email are never shown.`
            : `Neighbours see your name, ${name}.`
        }
      >
        <Row
          symbol="eye.slash.fill"
          tile={color.gray}
          title="Post Anonymously"
          accessory={
            <Switch
              value={profile.isAnonymous}
              onValueChange={setAnonymous}
              accessibilityLabel="Post anonymously"
            />
          }
        />
      </Section>

      <Section header="Your Reports" inset={60}>
        {mine.map((incident) => (
          <IncidentRow key={incident.id} incident={incident} />
        ))}
      </Section>

      <Section
        inset={60}
        footer="Alarmiti is a concept. Every neighbourhood, person and report in it is invented."
      >
        <Row
          symbol="house.fill"
          tile={color.green}
          title="Neighbourhood"
          detail={profile.region}
          accessory="chevron"
          onPress={chooseNeighbourhood}
        />
        <Row
          symbol="bell.badge.fill"
          tile={color.red}
          title="Urgent Alerts"
          accessory={
            <Switch value={urgentAlerts} onValueChange={setUrgentAlerts} accessibilityLabel="Urgent alerts" />
          }
        />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarEmpty: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.gray,
  },
});
