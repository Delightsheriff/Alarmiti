import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Incident, Profile, sampleIncidents, sampleProfile } from "./sample";

// In-memory state for the concept. Nothing is persisted; reloading the app
// brings back the sample data.

type NewIncident = Omit<Incident, "id" | "reportedAt" | "reporter">;

type SampleStore = {
  incidents: Incident[];
  profile: Profile;
  addIncident: (incident: NewIncident) => Incident;
  updateProfile: (changes: Partial<Profile>) => void;
};

const SampleStoreContext = createContext<SampleStore | null>(null);

export function SampleStoreProvider({ children }: PropsWithChildren) {
  const [incidents, setIncidents] = useState(sampleIncidents);
  const [profile, setProfile] = useState(sampleProfile);

  const addIncident = useCallback(
    (incident: NewIncident) => {
      const created: Incident = {
        ...incident,
        id: `inc-${Date.now()}`,
        reportedAt: new Date(),
        reporter:
          profile.isAnonymous || !profile.firstName
            ? profile.username
            : `${profile.firstName} ${profile.lastName}`.trim(),
      };
      setIncidents((current) => [created, ...current]);
      return created;
    },
    [profile]
  );

  const updateProfile = useCallback((changes: Partial<Profile>) => {
    setProfile((current) => ({ ...current, ...changes }));
  }, []);

  const value = useMemo(
    () => ({ incidents, profile, addIncident, updateProfile }),
    [incidents, profile, addIncident, updateProfile]
  );

  return (
    <SampleStoreContext.Provider value={value}>
      {children}
    </SampleStoreContext.Provider>
  );
}

export function useSampleStore() {
  const store = useContext(SampleStoreContext);
  if (!store) {
    throw new Error("useSampleStore must be used inside SampleStoreProvider");
  }
  return store;
}

export function useIncident(id: string | undefined) {
  const { incidents } = useSampleStore();
  return incidents.find((incident) => incident.id === id);
}
