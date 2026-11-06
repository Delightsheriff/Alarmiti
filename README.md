# Alarmiti

A concept UI for a neighbourhood-watch app: a feed of what's happening nearby, a quick way to report an incident, and a profile that lets you stay anonymous.

> **UI only.** There is no backend, account system or network API. Every screen runs on local sample data and bundled photos, and anything you add (a report, a name, a photo) lives in memory until the app reloads. All neighbourhoods, handles and events are invented.

## Screens

| Screen | What it shows |
| --- | --- |
| **Home** | Incident feed with an urgent badge, time, place and reporter. Tap a card for its details. |
| **Activities** | Compact list of recent reports with search across title, place, reporter and type. |
| **Incident details** | Location, category, time, description and the attached photo. |
| **Report incident** | Type picker, neighbourhood suggestions, description, and a photo from the camera or library. Submitting puts the report at the top of the feed. |
| **Profile** | Anonymous mode on by default. Turn it off to show your name, edit it, and pick a profile photo. |

The app opens straight onto the tabs. There is no sign-in or onboarding.

## Stack

- Expo SDK 53, React Native 0.79 (New Architecture), React 19
- expo-router with typed routes
- expo-image and expo-image-picker
- Manrope and Inter via `@expo-google-fonts`

The sample data is in [`data/sample.ts`](data/sample.ts), and the in-memory store that screens read from is in [`data/store.tsx`](data/store.tsx).

## Running it

```bash
npm install
npx expo run:ios
```

`expo run:ios` builds a development client and opens it on the iOS Simulator. `npx expo run:android` does the same for an Android emulator. The current Expo Go app only runs the latest SDK, so use a development build.

> **Known limit:** on Xcode 27, the iOS 27 Simulator refuses to launch apps that don't use the UIScene life cycle, and React Native 0.79 doesn't. Use an older iOS runtime, or upgrade the Expo SDK (see [docs/modernise.md](docs/modernise.md)).


## Checks

```bash
npm run typecheck
npm run lint
```
