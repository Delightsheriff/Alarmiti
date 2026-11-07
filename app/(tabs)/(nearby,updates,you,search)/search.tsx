import { IncidentRow } from "@/components/incidents";
import { Row, Section } from "@/components/list";
import { categories, reportableCategories } from "@/data/sample";
import { useSampleStore } from "@/data/store";
import { Stack } from "expo-router";
import { useRef, useState } from "react";
import { ScrollView } from "react-native";
import type { SearchBarCommands } from "react-native-screens";

export default function SearchScreen() {
  const { incidents } = useSampleStore();
  const [query, setQuery] = useState("");
  const searchBar = useRef<SearchBarCommands>(null);

  const needle = query.trim().toLowerCase();
  const results = incidents.filter((incident) =>
    [incident.title, incident.location, incident.description, categories[incident.category].label]
      .join(" ")
      .toLowerCase()
      .includes(needle),
  );

  const searchFor = (term: string) => {
    searchBar.current?.setText(term);
    setQuery(term);
  };

  return (
    <>
      <Stack.SearchBar
        ref={searchBar}
        placeholder="Reports, streets, categories"
        onChangeText={(event) => setQuery(event.nativeEvent.text)}
        onCancelButtonPress={() => setQuery("")}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardDismissMode="on-drag">
        {needle ? (
          <Section
            header={`${results.length} ${results.length === 1 ? "result" : "results"}`}
            footer={results.length === 0 ? `No reports match “${query.trim()}”.` : undefined}
            inset={60}
          >
            {results.map((incident) => (
              <IncidentRow key={incident.id} incident={incident} />
            ))}
          </Section>
        ) : (
          <Section header="Browse" inset={60}>
            {reportableCategories.map((key) => {
              const count = incidents.filter((incident) => incident.category === key).length;
              return (
                <Row
                  key={key}
                  symbol={categories[key].symbol}
                  tile={categories[key].tile}
                  title={categories[key].label}
                  detail={count ? String(count) : undefined}
                  accessory="chevron"
                  onPress={() => searchFor(categories[key].label)}
                />
              );
            })}
          </Section>
        )}
      </ScrollView>
    </>
  );
}
