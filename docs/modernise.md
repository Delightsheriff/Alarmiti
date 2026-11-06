# Modernising the Alarmiti UI

This is a proposal, not an implementation. It looks at the concept app as it is on the `concept` branch and suggests how to bring it up to the standard of current consumer apps, using four reference designs: a social reels app, a social feed, a travel app and a news app.

> **Status:** written before the redesign, from reading the code, when the app could not launch on the iOS 27 Simulator under Expo SDK 53. Steps 1 to 8 of the build order below are now built on Expo SDK 58. From step 9, the list animations and the new screenshots are done; the shared-element transition, skeletons and the Map toggle are not. See [screenshots/before](screenshots/before) and [screenshots/after](screenshots/after).

## A. What exists now

### Shared foundations

| Area | Now | Why it feels dated |
| --- | --- | --- |
| Colour | Navy `#1A2A44` background, white text, grey `#B0B8C4` secondary text. Every surface is `rgba(255,255,255,0.1)` with a `0.2` border. There are single uses of red `#FF6B6B` (urgent), green `#4CAF50` (anonymous badge) and iOS blue `#007AFF` (one FAB). | There's no accent and no severity scale, so "urgent" is the only signal and everything else looks the same. Translucent white boxes with white borders on navy read as 2019 dark mode. |
| Type | Manrope for headings, Inter for body. Sizes 12 to 24, with 16 most common. Headers are a centred 24pt "Alarmiti" on Home and Activities. | The pairing is good. The scale is flat: there's no large title or display size, so screens have no hierarchy at the top. |
| Shape | Radius 12 (17 uses), 16 (9) and 8 (8), mixed within the same screen. | The radii are inconsistent and every card has a hairline border, which looks boxy next to the soft, borderless cards in the references. |
| Tab bar | Flat 70pt navy bar with a top border, Ionicons outline/filled pairs and labels. | It's the stock tab bar. All four references use either a floating pill or a clean minimal bar. |
| Primary action | A FAB plus a separate black "Report Incident" label floating under it. On Home it's a white rounded square; on Activities it's a blue circle. | The FAB is inconsistent between tabs, the label overlaps content, and it sits above the tab bar instead of belonging to it. |
| Press feedback | `TouchableOpacity` opacity fade everywhere. No haptics, no scale. | Taps feel flat. |
| Motion | None besides the default stack push. | There's no sense of liveness, which matters for a "what's happening now" app. |

### Screen by screen

**Home (`app/(tabs)/index.tsx`)**
- Layout: centred title, then a vertical list of bordered cards. Each card has a title, a 3-line description, three meta rows (time, place, reporter) and a 120pt image at the bottom.
- Dated because: the image is last and small, so the card reads as text first. The three stacked meta rows take more height than the content. There's no greeting, no sense of *where* you are, no filters, and nothing tells you how serious or how close an incident is beyond one red "Urgent" pill.

**Activities (`app/(tabs)/activities.tsx`)**
- Layout: title with a search icon. Tapping it swaps the header for an inline search bar. Below is a list of bordered rows with a white icon tile, a one-line title and "reporter · time".
- Dated because: it's almost a duplicate of Home with less information. The search is hidden behind an icon, and there's no grouping by day, type or distance.

**Incident details (`app/incident-details.tsx`)**
- Layout: back button, title, then stacked sections for Location (a grey "map" placeholder with a pin icon), Incident card, Description card and Media (the photo comes last).
- Dated because: the most compelling content (photo, place) sits at the bottom or is a placeholder. Every section repeats the same bordered card. There are no updates, no "people nearby confirmed this", and no actions (share, follow, mark resolved).

**Report incident (`app/report-incident.tsx`)**
- Layout: a full screen with back button, type picker (inline expanding list), location input with suggestions, description, Take Photo / Upload buttons and a Submit bar.
- Dated because: it's a long form on its own screen. Picking a type is a text list rather than visual choices, and nothing guides the user or helps them gauge severity. On a safety app this should feel fast and calm.

**Profile (`app/(tabs)/profile.tsx`)**
- Layout: title, avatar (a shield when anonymous), name, email, region pill, an anonymous-mode card with a switch, and an editable name form when public.
- Dated because: it's settings-shaped with no sense of contribution (reports made, confirmations, neighbourhood). The anonymous badge is an unexplained green dot.

**Not found (`app/+not-found.tsx`)**: fine as a fallback, nothing to add.

## B. Proposed visual direction

**"Calm, local, live."** A safety app shouldn't feel alarming by default. Take the *structure* of the references (big rounded imagery, chip filters, a floating tab bar, greeting headers, a highlights row) and pair it with a restrained palette where colour only appears when it means something.

Which patterns fit, and which don't:

| Pattern (seen in) | Use it? | How it maps to Alarmiti |
| --- | --- | --- |
| Floating pill tab bar (reels, travel) | Yes | Three icon tabs plus a raised central **Report** button inside the pill. This replaces both FABs. |
| Greeting header with a context chip (news "Buenos Días" plus weather, travel "Hey, Runel") | Yes | "Good evening" with a **neighbourhood chip** ("Palm Grove Estate ▾") and a status chip ("2 alerts nearby"). |
| Highlights or stories row (reels, social feed) | Yes, reworked | A **"Nearby now"** row of rounded-square tiles: the latest urgent or very recent incidents, each with a severity ring instead of a "live" ring. The first tile is "+ Report" (the "Drop a vibe" pattern). |
| Chip filters with dropdowns (travel, news) | Yes | Type (All, Safety, Suspicious, Theft, Lost & found, Community) and distance (500 m / 1 km / 3 km) chips. |
| Big rounded hero card (news, travel) | Yes | The top urgent incident as a hero card with a photo, category badge and time. |
| Compact list rows with a thumbnail and source (news) | Yes | Activities, and "Earlier today" under the hero. |
| Full-bleed article hero with read time and source (news) | Yes | Incident details: a full-bleed photo or map, a category badge, "reported 35 min ago · 3 neighbours confirmed". |
| Bottom search sheet with toggles and a range slider (travel) | Yes | The filter sheet, and **Report as a sheet** rather than a pushed screen. |
| Glassy circular icon buttons (social feed, news) | Yes, sparingly | Over images (back, share, bookmark) and the header's search and notifications. |
| Reels full-bleed vertical video, reactions/likes, dotted pixel font | No | Engagement mechanics and novelty fonts work against trust. Use "Confirm" or "I saw this too" instead of likes. |

## C. Concrete changes per screen

### Home ("Nearby")
1. **Header:** "Good evening" in a large title (28 to 32pt Manrope Bold). Under it, a neighbourhood chip that opens a picker sheet, plus round glass buttons for search and notifications (with a badge).
2. **"Nearby now" row:** horizontal 76×96 rounded-square tiles. Each shows a photo (or a category icon on a tinted background), a severity ring and a short label ("Lights out · 35m"). The first tile is "+ Report".
3. **Filter chips:** a sticky row under the header for type chips and a distance chip with a dropdown.
4. **Hero card:** the most urgent or most recent incident. It's a 16:10 photo with 24pt radius and a gradient scrim, with the category badge top-left, the title in white over the image, and "Lantern Street · 35 min ago" below.
5. **Feed cards:** an image-first layout. Below the image is the title, then *one* meta line ("Riverside Close · 4 h · Neighbour #0917"), then a quiet action row: "Confirm (3)", "Follow", "Share". Cards without photos get a compact text card with a category icon tile.
6. **Map toggle:** a segmented "List | Map" control in the header. Map mode shows pins coloured by severity with a bottom card carousel. This can stay a static styled placeholder in the concept.

### Activities ("Updates" or "Timeline")
1. Give it a different job from Home: a **timeline of everything around you, including resolutions** ("Streetlights fixed ✓", "Cat reunited with owner").
2. Always show a search field in the header (the news "Explorar" pattern), with chips underneath.
3. Group rows under sticky day headers (Today, Yesterday, This week).
4. Rows have a 44pt category icon tile in the severity tint, a title, and "place · time". A small status tag on the right reads *Open*, *Monitoring* or *Resolved*.

### Incident details
1. **Hero:** a full-bleed photo (or a map snapshot when there's no photo) about 320pt tall, with glass back, share and follow buttons on top and a severity badge plus category chip at the bottom over a scrim.
2. **Title block:** a 24pt title, then "Lantern Street · 35 min ago · Neighbour #2481".
3. **Status strip:** *Open → Monitoring → Resolved* shown as a 3-step progress indicator.
4. **Description:** plain text on the background, without a bordered card.
5. **Updates timeline:** a vertical line with dots: "Reported", "2 neighbours confirmed", "Estate office notified", and so on.
6. **Location card:** a small map with a pin and an approximate radius. Keep "only general area is shared" as a caption.
7. **Bottom action bar:** a primary "I saw this too" button and a secondary "Add update" button.

### Report incident (sheet)
1. Open it as a **form sheet** from the tab bar's Report button. Use detents: medium, then large once the user starts typing.
2. **Step 1, type:** a 2-column grid of large tiles, each with an icon and label, tinted by default severity.
3. **Step 2, where:** "Use my area (Palm Grove Estate)" as the default chip, or search. The suggestions close on pick, as they do now.
4. **Step 3, details:** a description field with a gentle prompt ("What did you see? Avoid naming people."), a photo strip, and an "Urgent" toggle with a short explanation.
5. A sticky primary button: "Share with neighbours". On success, the sheet closes with a haptic, and a toast links to the new incident.
6. Keep a **"Post anonymously"** toggle at the bottom, defaulting to the profile setting.

### Profile
1. A header card with the avatar (an anonymous avatar uses a generated shape and colour, not a plain shield), the handle or name, and the neighbourhood.
2. A **stats row** (from the reels app's profile): Reports, Confirmations, Neighbours helped.
3. An **identity card** for anonymous mode. It shows exactly what others see ("Neighbours see: Neighbour #4210") with a preview, and replaces the green dot.
4. A list of "My reports" using the Activities row component.
5. Settings rows: notifications radius, quiet hours, about. These are static in the concept.

## D. Tokens

Keep these in one `theme/` module (plain TypeScript constants) and stop hardcoding hex values.

### Colour (light, mono, red for alerts)

The first pass used a dark navy palette with a mint accent. It was replaced with a light, monochrome one: near-black does the job of an accent, and red is kept for alerts.

| Token | Value | Use |
| --- | --- | --- |
| `bg` | `#F4F4F1` | App background, a soft off-white |
| `surface` | `#FFFFFF` | Cards, sheets |
| `surfaceRaised` | `#EAEAE6` | Chips, inputs, secondary buttons |
| `glass` | `rgba(255,255,255,0.72)` + blur | Icon buttons and the tab bar over content |
| `text` | `#111113` | Primary text |
| `textMuted` | `#5C5E63` | Secondary text |
| `textFaint` | `#8E9096` | Hints, inactive steps |
| `hairline` | `rgba(17,17,19,0.08)` | Dividers only, not card borders |
| `accent` | `#111113` | Active tab, primary button, selected chip |
| `onAccent` | `#FFFFFF` | Text on the accent |
| `alert` | `#E5322D` | The Report button and urgent reports |
| `onImage` | `#FFFFFF` | Text over photos, which keep a dark scrim |

**Severity scale.** These colours only appear on badges, rings, pins and icon tiles, never as large fills.

| Token | Value | Meaning |
| --- | --- | --- |
| `info` | `#6B6E75` | Community notice, lost & found |
| `low` | `#2E9466` | Resolved or low |
| `medium` | `#C98A0B` | Suspicious, noise, vandalism |
| `high` | `#E0662E` | Theft, safety hazard |
| `urgent` | `#E5322D` | Urgent (shares the alert red) |

Fades over light content end in a transparent off-white (`rgba(244,244,241,0)`), not `transparent`, which is transparent black and leaves a grey band.

### Type

| Token | Font | Size / line height |
| --- | --- | --- |
| `display` | Manrope Bold | 32 / 38 |
| `title` | Manrope Bold | 24 / 30 |
| `headline` | Manrope SemiBold | 18 / 24 |
| `body` | Inter Regular | 16 / 24 |
| `callout` | Inter Medium | 14 / 20 |
| `caption` | Inter Medium | 12 / 16, +0.2 tracking |
| `overline` | Inter SemiBold | 11 / 14, uppercase, +0.8 tracking (day headers) |

### Shape, space, elevation

- **Radius:** `sm 10` (chips and tags), `md 16` (rows, inputs), `lg 24` (cards, hero, sheets), `pill 999`.
- **Spacing:** a 4-point scale (4, 8, 12, 16, 20, 24, 32). Screen gutter 20.
- **Elevation:** no borders on cards. Separation comes from `surface` against `bg`. Only floating elements (tab bar, Report button, sheets) get a soft shadow (0 8 24 rgba(0,0,0,0.35)).

### Components

- **`TabBarPill`**: floating, 64pt tall, 20pt from the edges, `surfaceRaised` with blur. Icon-only tabs, with the active one shown as an accent circle. A raised accent "+" in the centre for Report.
- **`Chip`**: filled, outline and dropdown variants, 36pt tall, `radius.pill`.
- **`IconButton`**: 40pt circle with solid and glass variants.
- **`SeverityBadge`** and **`SeverityRing`**.
- **`IncidentHeroCard`**, **`IncidentCard`** (with and without media) and **`IncidentRow`**.
- **`HighlightTile`**: the "Nearby now" tile.
- **`Timeline`**: dot, line and entry.
- **`Sheet`**: native form sheet with detents.
- **`StatTile`** and **`SectionHeader`**.
- **Press feedback:** a 0.97 scale spring plus a light haptic on primary actions, shared by every pressable.

## E. Build order

1. **Upgrade first:** Expo SDK 58 / RN 0.88, matching split-the-cost. This unblocks native form sheets, the current expo-router APIs and Reanimated 4, and makes the app launch on the current Simulator again, so screenshots become possible. (L)
2. **Tokens and primitives:** the `theme/` module, `Chip`, `IconButton`, `SeverityBadge`, a press wrapper with haptics, and the type scale. Swap the hardcoded colours across screens. Visible change: same layouts, new palette. (M)
3. **Floating tab bar with the central Report button**, removing both FABs. (M)
4. **Home:** greeting header, neighbourhood chip, filter chips, hero card and image-first feed cards. Add `severity` and `status` fields to the sample data. (M)
5. **Incident details:** hero, status strip, timeline and action bar. Add `updates[]` to the sample data. (M)
6. **Report as a sheet:** type grid, area default, photo strip, anonymous toggle, success haptic and toast. (M)
7. **"Nearby now" highlights row and the Activities timeline** with day groups and resolved items. (M)
8. **Profile:** stats, identity preview card, My reports. (S to M)
9. **Polish:** list enter animations, shared-element transition from card to detail hero, skeletons, the Map toggle (styled static map), and new README screenshots. (M)

Steps 2 and 3 alone would change how the app reads in a portfolio screenshot. Steps 4 to 6 are the ones to show off.
