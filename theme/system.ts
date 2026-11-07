import { PlatformColor, TextStyle } from "react-native";

// The app draws with iOS system colours and the system font, so it follows
// light and dark mode, Increase Contrast and Dynamic Type like Apple's apps do.

export const color = {
  label: PlatformColor("label"),
  secondaryLabel: PlatformColor("secondaryLabel"),
  tertiaryLabel: PlatformColor("tertiaryLabel"),
  background: PlatformColor("systemGroupedBackground"),
  cell: PlatformColor("secondarySystemGroupedBackground"),
  cellPressed: PlatformColor("systemGray4"),
  separator: PlatformColor("separator"),
  fill: PlatformColor("tertiarySystemFill"),
  tint: PlatformColor("systemBlue"),
  red: PlatformColor("systemRed"),
  orange: PlatformColor("systemOrange"),
  yellow: PlatformColor("systemYellow"),
  green: PlatformColor("systemGreen"),
  teal: PlatformColor("systemTeal"),
  blue: PlatformColor("systemBlue"),
  indigo: PlatformColor("systemIndigo"),
  purple: PlatformColor("systemPurple"),
  brown: PlatformColor("systemBrown"),
  gray: PlatformColor("systemGray"),
  white: "#FFFFFF",
} as const;

// Apple's text styles at the default Dynamic Type size.
export const text = {
  largeTitle: { fontSize: 34, lineHeight: 41, fontWeight: "700" },
  title2: { fontSize: 22, lineHeight: 28, fontWeight: "700" },
  title3: { fontSize: 20, lineHeight: 25, fontWeight: "600" },
  headline: { fontSize: 17, lineHeight: 22, fontWeight: "600" },
  body: { fontSize: 17, lineHeight: 22 },
  callout: { fontSize: 16, lineHeight: 21 },
  subheadline: { fontSize: 15, lineHeight: 20 },
  footnote: { fontSize: 13, lineHeight: 18 },
  caption: { fontSize: 12, lineHeight: 16 },
} satisfies Record<string, TextStyle>;

/** Corner radius of inset grouped sections and cards on iOS 26. */
export const CARD_RADIUS = 26;
