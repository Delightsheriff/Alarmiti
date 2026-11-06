import type { Severity } from "@/theme/tokens";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

// Everything in this file is invented for the concept. The neighbourhoods,
// handles and events do not refer to real places or people.

type IconName = ComponentProps<typeof Ionicons>["name"];

export type IncidentCategory =
  | "suspicious"
  | "theft"
  | "vandalism"
  | "noise"
  | "safety"
  | "lost-pet"
  | "community"
  | "other";

export type IncidentStatus = "open" | "monitoring" | "resolved";

export type IncidentUpdate = {
  at: Date;
  text: string;
  kind: "reported" | "confirmed" | "official" | "resolved";
};

export type Incident = {
  id: string;
  category: IncidentCategory;
  severity: Severity;
  status: IncidentStatus;
  title: string;
  description: string;
  location: string;
  distanceKm: number;
  reportedAt: Date;
  reporter: string;
  confirmations: number;
  updates: IncidentUpdate[];
  image?: number | { uri: string };
};

export type Profile = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  region: string;
  isAnonymous: boolean;
  avatarUri?: string;
  stats: { reports: number; confirmations: number; helped: number };
};

export const categories: Record<
  IncidentCategory,
  { label: string; short: string; icon: IconName; severity: Severity }
> = {
  suspicious: {
    label: "Suspicious Activity",
    short: "Suspicious",
    icon: "eye",
    severity: "medium",
  },
  theft: { label: "Theft", short: "Theft", icon: "bag-handle", severity: "high" },
  vandalism: {
    label: "Vandalism",
    short: "Vandalism",
    icon: "hammer",
    severity: "medium",
  },
  noise: {
    label: "Noise Complaint",
    short: "Noise",
    icon: "volume-high",
    severity: "medium",
  },
  safety: {
    label: "Safety Hazard",
    short: "Safety",
    icon: "warning",
    severity: "high",
  },
  "lost-pet": {
    label: "Lost & Found",
    short: "Lost & found",
    icon: "paw",
    severity: "info",
  },
  community: {
    label: "Community Notice",
    short: "Community",
    icon: "people",
    severity: "info",
  },
  other: {
    label: "Other",
    short: "Other",
    icon: "ellipsis-horizontal",
    severity: "low",
  },
};

export const reportableCategories: IncidentCategory[] = [
  "suspicious",
  "theft",
  "safety",
  "vandalism",
  "noise",
  "lost-pet",
  "community",
  "other",
];

export const statusLabels: Record<IncidentStatus, string> = {
  open: "Open",
  monitoring: "Monitoring",
  resolved: "Resolved",
};

export const neighbourhoods = [
  "Palm Grove Estate",
  "Lantern Street",
  "Riverside Close",
  "Old Market Row",
  "Hilltop Gardens",
  "Cedar Avenue",
  "Harbour View",
  "Sunflower Court",
];

export const minutesAgo = (minutes: number) =>
  new Date(Date.now() - minutes * 60 * 1000);

export const sampleIncidents: Incident[] = [
  {
    id: "inc-1",
    category: "safety",
    severity: "urgent",
    status: "open",
    title: "Streetlights out on Lantern Street",
    description:
      "The whole stretch between the bakery and the school gate is dark tonight. Walk in pairs if you can and use the main road until the council fixes it.",
    location: "Lantern Street",
    distanceKm: 0.4,
    reportedAt: minutesAgo(35),
    reporter: "Neighbour #2481",
    confirmations: 6,
    updates: [
      { at: minutesAgo(35), kind: "reported", text: "Reported by Neighbour #2481" },
      { at: minutesAgo(28), kind: "confirmed", text: "4 neighbours confirmed it" },
      {
        at: minutesAgo(12),
        kind: "official",
        text: "Council lighting team notified by the estate office",
      },
    ],
  },
  {
    id: "inc-3",
    category: "suspicious",
    severity: "high",
    status: "monitoring",
    title: "Car door checks on Riverside Close",
    description:
      "Someone was seen trying car door handles along the parked row by the shops this afternoon. Nothing was taken that we know of. Lock up and keep valuables out of sight.",
    location: "Riverside Close",
    distanceKm: 0.8,
    reportedAt: minutesAgo(95),
    reporter: "Neighbour #0917",
    confirmations: 3,
    image: require("../assets/images/feed/parked-cars.jpg"),
    updates: [
      { at: minutesAgo(95), kind: "reported", text: "Reported by Neighbour #0917" },
      { at: minutesAgo(80), kind: "confirmed", text: "2 neighbours saw the same person" },
      {
        at: minutesAgo(40),
        kind: "official",
        text: "Evening patrol is adding Riverside Close to its route",
      },
    ],
  },
  {
    id: "inc-2",
    category: "community",
    severity: "info",
    status: "open",
    title: "Residents' safety meeting on Thursday",
    description:
      "Palm Grove residents are meeting at the community hall at 6 PM to plan the new evening patrol rota. Everyone is welcome.",
    location: "Palm Grove Estate",
    distanceKm: 0.2,
    reportedAt: minutesAgo(140),
    reporter: "Palm Grove Residents Group",
    confirmations: 18,
    image: require("../assets/images/feed/meeting-room.jpg"),
    updates: [
      {
        at: minutesAgo(140),
        kind: "reported",
        text: "Posted by Palm Grove Residents Group",
      },
    ],
  },
  {
    id: "inc-4",
    category: "lost-pet",
    severity: "info",
    status: "open",
    title: "Found: two golden puppies",
    description:
      "Two friendly golden puppies were playing by the pharmacy on Cedar Avenue this morning with no one around. They're safe indoors now. Message to describe them and collect.",
    location: "Cedar Avenue",
    distanceKm: 1.3,
    reportedAt: minutesAgo(410),
    reporter: "Neighbour #3302",
    confirmations: 9,
    image: require("../assets/images/feed/puppies.jpg"),
    updates: [
      { at: minutesAgo(410), kind: "reported", text: "Posted by Neighbour #3302" },
    ],
  },
  {
    id: "inc-5",
    category: "theft",
    severity: "high",
    status: "open",
    title: "Bicycle taken from Old Market Row",
    description:
      "A green bicycle was taken from the rack outside the library between 2 and 3 PM. If you have a doorbell camera facing the street, please check your footage.",
    location: "Old Market Row",
    distanceKm: 1.9,
    reportedAt: minutesAgo(600),
    reporter: "Neighbour #1145",
    confirmations: 2,
    updates: [
      { at: minutesAgo(600), kind: "reported", text: "Reported by Neighbour #1145" },
    ],
  },
  {
    id: "inc-9",
    category: "safety",
    severity: "low",
    status: "resolved",
    title: "Fallen branch cleared on Cedar Avenue",
    description:
      "The branch blocking the pavement outside number 14 has been cut up and removed. The path is clear again.",
    location: "Cedar Avenue",
    distanceKm: 1.2,
    reportedAt: minutesAgo(1300),
    reporter: "Neighbour #3302",
    confirmations: 5,
    updates: [
      { at: minutesAgo(1300), kind: "reported", text: "Reported by Neighbour #3302" },
      { at: minutesAgo(900), kind: "resolved", text: "Cleared by the estate grounds team" },
    ],
  },
  {
    id: "inc-6",
    category: "vandalism",
    severity: "medium",
    status: "open",
    title: "Bus shelter glass smashed",
    description:
      "The shelter at the Hilltop Gardens stop has broken glass on the bench and pavement. Watch your step until it's cleared.",
    location: "Hilltop Gardens",
    distanceKm: 2.6,
    reportedAt: minutesAgo(1500),
    reporter: "Neighbour #5528",
    confirmations: 4,
    updates: [
      { at: minutesAgo(1500), kind: "reported", text: "Reported by Neighbour #5528" },
    ],
  },
  {
    id: "inc-7",
    category: "noise",
    severity: "medium",
    status: "monitoring",
    title: "Generator running all night",
    description:
      "A loud generator on Sunflower Court has been running past midnight for three nights now. It has been reported to the estate office.",
    location: "Sunflower Court",
    distanceKm: 1.1,
    reportedAt: minutesAgo(2900),
    reporter: "Neighbour #7764",
    confirmations: 7,
    updates: [
      { at: minutesAgo(2900), kind: "reported", text: "Reported by Neighbour #7764" },
      { at: minutesAgo(2000), kind: "official", text: "Estate office spoke to the owner" },
    ],
  },
  {
    id: "inc-8",
    category: "safety",
    severity: "high",
    status: "resolved",
    title: "Open drain cover near Harbour View",
    description:
      "A drain cover was missing at the corner by the bus stop. A new cover has now been fitted.",
    location: "Harbour View",
    distanceKm: 2.9,
    reportedAt: minutesAgo(4300),
    reporter: "Neighbour #6031",
    confirmations: 11,
    updates: [
      { at: minutesAgo(4300), kind: "reported", text: "Reported by Neighbour #6031" },
      { at: minutesAgo(3600), kind: "official", text: "Council works team booked" },
      { at: minutesAgo(1700), kind: "resolved", text: "New drain cover fitted" },
    ],
  },
];

export const sampleProfile: Profile = {
  username: "Neighbour #4210",
  firstName: "",
  lastName: "",
  email: "you@example.com",
  region: "Palm Grove Estate",
  isAnonymous: true,
  stats: { reports: 4, confirmations: 23, helped: 61 },
};

/** Reports the profile screen lists as the user's own. */
export const myReportIds = ["inc-9", "inc-6"];

export const formatClockTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const suffix = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${minutes} ${suffix}`;
};

export const formatRelativeTime = (date: Date) => {
  const minutes = Math.max(0, Math.round((Date.now() - date.getTime()) / 60000));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  return `${days} d ago`;
};

export const formatDistance = (km: number) =>
  km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;

/** "Today", "Yesterday" or the weekday, for grouping the timeline. */
export const dayLabel = (date: Date) => {
  const start = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.round((start(new Date()) - start(date)) / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return date.toLocaleDateString("en-GB", { weekday: "long" });
};

export const greeting = (date = new Date()) => {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};
