import { incidentHref } from "@/components/incidents";
import { Row, Section } from "@/components/list";
import { categories, IncidentCategory, reportableCategories } from "@/data/sample";
import { useSampleStore } from "@/data/store";
import { color, text } from "@/theme/system";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Switch, TextInput } from "react-native";

export default function ReportScreen() {
  const { profile, addIncident } = useSampleStore();
  const [category, setCategory] = useState<IncidentCategory | null>(null);
  const [location, setLocation] = useState(profile.region);
  const [description, setDescription] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [urgent, setUrgent] = useState(false);
  const [anonymous, setAnonymous] = useState(profile.isAnonymous);

  const ready = Boolean(category && location.trim() && description.trim());

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const post = () => {
    if (!category) return;
    const created = addIncident({
      category,
      location: location.trim(),
      description: description.trim(),
      urgent,
      anonymous,
      image: photoUri ? { uri: photoUri } : undefined,
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
    router.push(incidentHref(created.id));
  };

  return (
    <>
      <Stack.Toolbar placement="left">
        <Stack.Toolbar.Button icon="xmark" accessibilityLabel="Cancel" onPress={() => router.back()} />
      </Stack.Toolbar>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon="arrow.up"
          variant="prominent"
          accessibilityLabel="Post report"
          disabled={!ready}
          onPress={post}
        />
      </Stack.Toolbar>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="interactive"
        contentContainerStyle={styles.content}
      >
        <Section header="What's happening?" inset={60}>
          {reportableCategories.map((key) => (
            <Row
              key={key}
              symbol={categories[key].symbol}
              tile={categories[key].tile}
              title={categories[key].label}
              accessory={category === key ? "check" : "none"}
              accessibilityState={{ selected: category === key }}
              onPress={() => {
                Haptics.selectionAsync();
                setCategory(key);
              }}
            />
          ))}
        </Section>

        <Section header="Where" footer="Only the general area is shared, never an exact address.">
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Street or area"
            placeholderTextColor={color.tertiaryLabel}
            clearButtonMode="while-editing"
            accessibilityLabel="Where"
            style={[text.body, styles.input]}
          />
        </Section>

        <Section header="Details">
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="What did you see? Keep to what neighbours need to know."
            placeholderTextColor={color.tertiaryLabel}
            multiline
            accessibilityLabel="Details"
            style={[text.body, styles.input, styles.multiline]}
          />
        </Section>

        <Section inset={60}>
          {photoUri ? (
            <>
              <Row
                title="Photo attached"
                leading={<Image source={{ uri: photoUri }} style={styles.thumbnail} contentFit="cover" />}
              />
              <Row title="Remove Photo" destructive onPress={() => setPhotoUri(null)} />
            </>
          ) : (
            <Row
              symbol="photo.on.rectangle"
              tile={color.blue}
              title="Add Photo"
              accessory="chevron"
              onPress={pickPhoto}
            />
          )}
        </Section>

        <Section
          inset={60}
          footer={
            anonymous
              ? `Neighbours will see you as ${profile.username}.`
              : "Neighbours will see your name."
          }
        >
          <Row
            symbol="exclamationmark.triangle.fill"
            tile={color.red}
            title="Urgent"
            accessory={<Switch value={urgent} onValueChange={setUrgent} accessibilityLabel="Urgent" />}
          />
          <Row
            symbol="eye.slash.fill"
            tile={color.gray}
            title="Post Anonymously"
            accessory={
              <Switch value={anonymous} onValueChange={setAnonymous} accessibilityLabel="Post anonymously" />
            }
          />
        </Section>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
  },
  input: {
    color: color.label,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  multiline: {
    minHeight: 120,
    paddingTop: 14,
    textAlignVertical: "top",
  },
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderCurve: "continuous",
  },
});
