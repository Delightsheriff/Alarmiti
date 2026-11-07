import { CARD_RADIUS, color, text } from "@/theme/system";
import { SymbolView } from "expo-symbols";
import { Children, Fragment, isValidElement, ReactNode } from "react";
import {
  ColorValue,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { SFSymbol } from "sf-symbols-typescript";

// Inset grouped lists in the style of Settings: rounded sections on the grouped
// background, rows that highlight while held, and separators inset past the icon.

/** A white SF Symbol on a rounded coloured square, as in Settings. */
export function IconTile({
  symbol,
  tile,
  size = 30,
}: {
  symbol: SFSymbol;
  tile: ColorValue;
  size?: number;
}) {
  return (
    <View
      style={[
        styles.tile,
        {
          width: size,
          height: size,
          borderRadius: size * 0.27,
          backgroundColor: tile,
        },
      ]}
    >
      <SymbolView name={symbol} size={size * 0.56} tintColor={color.white} />
    </View>
  );
}

export function Section({
  header,
  footer,
  inset = 16,
  children,
}: {
  header?: string;
  footer?: string;
  /** Where separators start, so they line up with the row text. */
  inset?: number;
  children: ReactNode;
}) {
  // Flatten fragments and drop falsy children so separators only sit between rows.
  const rows: ReactNode[] = [];
  const collect = (nodes: ReactNode) =>
    Children.forEach(nodes, (child) => {
      if (
        isValidElement<{ children?: ReactNode }>(child) &&
        child.type === Fragment
      ) {
        collect(child.props.children);
      } else if (child) {
        rows.push(child);
      }
    });
  collect(children);

  return (
    <View style={styles.section}>
      {header && <Text style={styles.header}>{header}</Text>}
      {rows.length > 0 && (
        <View style={styles.group}>
          {rows.map((row, index) => (
            <Fragment key={index}>
              {index > 0 && (
                <View style={[styles.separator, { marginLeft: inset }]} />
              )}
              {row}
            </Fragment>
          ))}
        </View>
      )}
      {footer && <Text style={styles.footer}>{footer}</Text>}
    </View>
  );
}

type Accessory = "chevron" | "check" | "none" | ReactNode;

export function Row({
  symbol,
  tile,
  title,
  subtitle,
  detail,
  detailColor,
  accessory = "none",
  destructive,
  action,
  leading,
  titleLines = 1,
  ...pressable
}: Omit<PressableProps, "children" | "style"> & {
  symbol?: SFSymbol;
  tile?: ColorValue;
  title: string;
  subtitle?: string;
  /** Right-aligned value, as in "Version 1.0". */
  detail?: string;
  detailColor?: ColorValue;
  accessory?: Accessory;
  destructive?: boolean;
  /** Draws the title in the tint colour, for rows that do something. */
  action?: boolean;
  /** Replaces the icon tile, for avatars and thumbnails. */
  leading?: ReactNode;
  titleLines?: number;
}) {
  const interactive = Boolean(pressable.onPress);
  return (
    <Pressable
      accessibilityRole={interactive ? "button" : undefined}
      {...pressable}
      style={({ pressed }) => [
        styles.row,
        pressed && interactive && { backgroundColor: color.cellPressed },
      ]}
    >
      {leading ??
        (symbol && tile ? <IconTile symbol={symbol} tile={tile} /> : null)}
      <View style={styles.rowText}>
        <Text
          numberOfLines={titleLines}
          style={[
            text.body,
            {
              color: destructive
                ? color.red
                : action
                  ? color.tint
                  : color.label,
            },
          ]}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            numberOfLines={2}
            style={[text.subheadline, { color: color.secondaryLabel }]}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {detail && (
        <Text
          numberOfLines={1}
          style={[
            text.body,
            styles.detail,
            { color: detailColor ?? color.secondaryLabel },
          ]}
        >
          {detail}
        </Text>
      )}
      {accessory === "chevron" ? (
        <SymbolView
          name="chevron.right"
          size={13}
          weight="semibold"
          tintColor={color.tertiaryLabel}
        />
      ) : accessory === "check" ? (
        <SymbolView
          name="checkmark"
          size={17}
          weight="semibold"
          tintColor={color.tint}
        />
      ) : accessory === "none" ? null : (
        accessory
      )}
    </Pressable>
  );
}

/** Plain text inside a section, such as a description. */
export function TextCell({ children }: { children: ReactNode }) {
  return (
    <View style={styles.textCell}>
      <Text style={[text.body, { color: color.label }]}>{children}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  section: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  header: {
    ...text.footnote,
    color: color.secondaryLabel,
    paddingHorizontal: 16,
    paddingBottom: 7,
  },
  standaloneHeader: {
    marginHorizontal: 16,
  },
  footer: {
    ...text.footnote,
    color: color.secondaryLabel,
    paddingHorizontal: 16,
    paddingTop: 7,
  },
  group: {
    borderRadius: CARD_RADIUS,
    borderCurve: "continuous",
    backgroundColor: color.cell,
    overflow: "hidden",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: color.separator,
  },
  row: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  detail: {
    maxWidth: "50%",
  },
  tile: {
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",
  },
  textCell: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

/** A section header for content that isn't a list, such as a featured card. */
export function SectionHeader({ children }: { children: string }) {
  return (
    <Text style={[styles.header, styles.standaloneHeader]}>{children}</Text>
  );
}
