import { TextStyle } from "react-native";

// Design tokens for the redesign (see docs/modernise.md). Screens read colour,
// type, shape and spacing from here instead of hardcoding values.

// Light and monochrome: ink black does the work of an accent (primary buttons,
// selected chips, the active tab), and red is kept for alerts alone.
export const colors = {
  bg: "#F4F4F1",
  surface: "#FFFFFF",
  surfaceRaised: "#EAEAE6",
  glass: "rgba(255, 255, 255, 0.72)",
  scrim: "rgba(10, 10, 12, 0.82)",
  text: "#111113",
  textMuted: "#5C5E63",
  textFaint: "#8E9096",
  hairline: "rgba(17, 17, 19, 0.08)",
  accent: "#111113",
  onAccent: "#FFFFFF",
  alert: "#E5322D",
  onAlert: "#FFFFFF",
  // Text and icons laid over photos, which stay dark behind a scrim.
  onImage: "#FFFFFF",
  onImageMuted: "rgba(255, 255, 255, 0.82)",
} as const;

export type Severity = "info" | "low" | "medium" | "high" | "urgent";

// Severity colours only appear on badges, rings, pins and icon tiles. The scale
// stays quiet until it matters: grey and green, then amber, orange and alert red.
export const severity: Record<Severity, { color: string; label: string }> = {
  info: { color: "#6B6E75", label: "Notice" },
  low: { color: "#2E9466", label: "Low" },
  medium: { color: "#C98A0B", label: "Medium" },
  high: { color: "#E0662E", label: "High" },
  urgent: { color: "#E5322D", label: "Urgent" },
};

/** A severity colour at low opacity, for tile and chip backgrounds. */
export const tint = (hex: string, alpha = 0.16) => {
  const value = parseInt(hex.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const type = {
  display: { fontFamily: "Manrope-Bold", fontSize: 32, lineHeight: 38 },
  title: { fontFamily: "Manrope-Bold", fontSize: 24, lineHeight: 30 },
  headline: { fontFamily: "Manrope-SemiBold", fontSize: 18, lineHeight: 24 },
  body: { fontFamily: "Inter-Regular", fontSize: 16, lineHeight: 24 },
  callout: { fontFamily: "Inter-Medium", fontSize: 14, lineHeight: 20 },
  caption: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  overline: {
    fontFamily: "Inter-SemiBold",
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
} satisfies Record<string, TextStyle>;

export const radius = { sm: 10, md: 16, lg: 24, pill: 999 } as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  gutter: 20,
} as const;

export const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.08,
  shadowRadius: 24,
  elevation: 12,
} as const;

/** Space the floating tab bar takes at the bottom, so lists can clear it. */
export const TAB_BAR_CLEARANCE = 120;
