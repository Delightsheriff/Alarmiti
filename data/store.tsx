import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  categories,
  Incident,
  IncidentCategory,
  Profile,
  sampleIncidents,
  sampleProfile,
} from "./sample";

// In-memory state for the concept. Nothing is persisted; reloading the app
// brings back the sample data.

export type NewIncident = {
  category: IncidentCategory;
  location: string;
  description: string;
  urgent: boolean;
  anonymous: boolean;
  image?: Incident["image"];
};

type SampleStore = {
  incidents: Incident[];
  profile: Profile;
  confirmed: Set<string>;
  followed: Set<string>;
  addIncident: (incident: NewIncident) => Incident;
  toggleConfirm: (id: string) => void;
  toggleFollow: (id: string) => void;
  updateProfile: (changes: Partial<Profile>) => void;
};

const SampleStoreContext = createContext<SampleStore | null>(null);

export function SampleStoreProvider({ children }: PropsWithChildren) {
  const [incidents, setIncidents] = useState(sampleIncidents);
  const [profile, setProfile] = useState(sampleProfile);
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());
  const [followed, setFollowed] = useState<Set<string>>(new Set());

  const addIncident = useCallback(
    ({ category, location, description, urgent, anonymous, image }: NewIncident) => {
      const reporter =
        anonymous || !profile.firstName
          ? profile.username
          : `${profile.firstName} ${profile.lastName}`.trim();
      const now = new Date();
      const created: Incident = {
        id: `inc-${now.getTime()}`,
        category,
        severity: urgent ? "urgent" : categories[category].severity,
        status: "open",
        title: `${categories[category].label} at ${location}`,
        description,
        location,
        distanceKm: 0.1,
        reportedAt: now,
        reporter,
        confirmations: 0,
        image,
        updates: [{ at: now, kind: "reported", text: `Reported by ${reporter}` }],
      };
      setIncidents((current) => [created, ...current]);
      setProfile((current) => ({
        ...current,
        stats: { ...current.stats, reports: current.stats.reports + 1 },
      }));
      return created;
    },
    [profile]
  );

  const toggleConfirm = useCallback((id: string) => setConfirmed((current) => toggled(current, id)), []);
  const toggleFollow = useCallback((id: string) => setFollowed((current) => toggled(current, id)), []);

  const updateProfile = useCallback((changes: Partial<Profile>) => {
    setProfile((current) => ({ ...current, ...changes }));
  }, []);

  const value = useMemo(
    () => ({ incidents, profile, confirmed, followed, addIncident, toggleConfirm, toggleFollow, updateProfile }),
    [incidents, profile, confirmed, followed, addIncident, toggleConfirm, toggleFollow, updateProfile]
  );

  return (
    <SampleStoreContext.Provider value={value}>
      {children}
    </SampleStoreContext.Provider>
  );
}

function toggled(set: Set<string>, id: string) {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
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

/** Confirmations including the user's own tap. */
export function useConfirmations(incident: Incident) {
  const { confirmed } = useSampleStore();
  const mine = confirmed.has(incident.id);
  return { count: incident.confirmations + (mine ? 1 : 0), mine };
}
