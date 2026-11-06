import { TextStyle } from "react-native";

// Design tokens for the redesign (see docs/modernise.md). Screens read colour,
// type, shape and spacing from here instead of hardcoding values.

export const colors = {
  bg: "#0E1624",
  surface: "#172234",
  surfaceRaised: "#1F2C42",
  glass: "rgba(255, 255, 255, 0.12)",
  scrim: "rgba(8, 12, 20, 0.85)",
  text: "#F5F7FA",
  textMuted: "#9AA6B8",
  textFaint: "#6B778A",
  hairline: "rgba(255, 255, 255, 0.08)",
  accent: "#7CF2C8",
  onAccent: "#062A1F",
} as const;

export type Severity = "info" | "low" | "medium" | "high" | "urgent";

// Severity colours only appear on badges, rings, pins and icon tiles.
export const severity: Record<Severity, { color: string; label: string }> = {
  info: { color: "#7AA7FF", label: "Notice" },
  low: { color: "#7CF2C8", label: "Low" },
  medium: { color: "#FFC857", label: "Medium" },
  high: { color: "#FF8A5C", label: "High" },
  urgent: { color: "#FF5A6E", label: "Urgent" },
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
  shadowOpacity: 0.35,
  shadowRadius: 24,
  elevation: 12,
} as const;

/** Space the floating tab bar takes at the bottom, so lists can clear it. */
export const TAB_BAR_CLEARANCE = 120;
