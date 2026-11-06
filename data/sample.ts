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

export type Incident = {
  id: string;
  category: IncidentCategory;
  title: string;
  description: string;
  location: string;
  reportedAt: Date;
  reporter: string;
  urgent?: boolean;
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
};

export const categories: Record<
  IncidentCategory,
  { label: string; icon: IconName }
> = {
  suspicious: { label: "Suspicious Activity", icon: "eye" },
  theft: { label: "Theft", icon: "bag-handle" },
  vandalism: { label: "Vandalism", icon: "hammer" },
  noise: { label: "Noise Complaint", icon: "volume-high" },
  safety: { label: "Safety Concern", icon: "bulb" },
  "lost-pet": { label: "Lost Pet", icon: "paw" },
  community: { label: "Community Notice", icon: "people" },
  other: { label: "Other", icon: "ellipsis-horizontal" },
};

export const reportableCategories: IncidentCategory[] = [
  "suspicious",
  "theft",
  "vandalism",
  "noise",
  "safety",
  "lost-pet",
  "other",
];

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

const minutesAgo = (minutes: number) =>
  new Date(Date.now() - minutes * 60 * 1000);

export const sampleIncidents: Incident[] = [
  {
    id: "inc-1",
    category: "safety",
    urgent: true,
    title: "Streetlights out on Lantern Street",
    description:
      "The whole stretch between the bakery and the school gate is dark tonight. Walk in pairs if you can and use the main road until the council fixes it.",
    location: "Lantern Street",
    reportedAt: minutesAgo(35),
    reporter: "Neighbour #2481",
  },
  {
    id: "inc-2",
    category: "community",
    title: "Residents' safety meeting on Thursday",
    description:
      "Palm Grove residents are meeting at the community hall at 6 PM to plan the new evening patrol rota. Everyone is welcome.",
    location: "Palm Grove Estate",
    reportedAt: minutesAgo(140),
    reporter: "Palm Grove Residents Group",
    image: require("../assets/images/feed/meeting-room.jpg"),
  },
  {
    id: "inc-3",
    category: "suspicious",
    title: "Car door checks on Riverside Close",
    description:
      "Someone was seen trying car door handles along the parked row by the shops this afternoon. Nothing was taken that we know of. Lock up and keep valuables out of sight.",
    location: "Riverside Close",
    reportedAt: minutesAgo(260),
    reporter: "Neighbour #0917",
    image: require("../assets/images/feed/parked-cars.jpg"),
  },
  {
    id: "inc-4",
    category: "lost-pet",
    title: "Found: two golden puppies",
    description:
      "Two friendly golden puppies were playing by the pharmacy on Cedar Avenue this morning with no one around. They're safe indoors now. Message to describe them and collect.",
    location: "Cedar Avenue",
    reportedAt: minutesAgo(410),
    reporter: "Neighbour #3302",
    image: require("../assets/images/feed/puppies.jpg"),
  },
  {
    id: "inc-5",
    category: "theft",
    title: "Bicycle taken from Old Market Row",
    description:
      "A green bicycle was taken from the rack outside the library between 2 and 3 PM. If you have a doorbell camera facing the street, please check your footage.",
    location: "Old Market Row",
    reportedAt: minutesAgo(600),
    reporter: "Neighbour #1145",
  },
  {
    id: "inc-6",
    category: "vandalism",
    title: "Bus shelter glass smashed",
    description:
      "The shelter at the Hilltop Gardens stop has broken glass on the bench and pavement. Watch your step until it's cleared.",
    location: "Hilltop Gardens",
    reportedAt: minutesAgo(1500),
    reporter: "Neighbour #5528",
  },
  {
    id: "inc-7",
    category: "noise",
    title: "Generator running all night",
    description:
      "A loud generator on Sunflower Court has been running past midnight for three nights now. It has been reported to the estate office.",
    location: "Sunflower Court",
    reportedAt: minutesAgo(2900),
    reporter: "Neighbour #7764",
  },
  {
    id: "inc-8",
    category: "safety",
    title: "Open drain cover near Harbour View",
    description:
      "A drain cover is missing at the corner by the bus stop. Someone has put a cone over it for now, but it's easy to miss after dark.",
    location: "Harbour View",
    reportedAt: minutesAgo(4300),
    reporter: "Neighbour #6031",
  },
];

export const sampleProfile: Profile = {
  username: "Neighbour #4210",
  firstName: "",
  lastName: "",
  email: "you@example.com",
  region: "Palm Grove Estate",
  isAnonymous: true,
};

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
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
};
