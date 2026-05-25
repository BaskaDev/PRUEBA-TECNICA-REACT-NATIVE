# BancoXYZ

Mobile banking application built with React Native (Expo SDK 56).

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React Native + Expo SDK 56 |
| Navigation | Expo Router (file-based) |
| Styling | NativeWind (Tailwind CSS) |
| State | Zustand (global) + TanStack Query (server) |
| HTTP | Axios |
| Animations | React Native Reanimated |
| Secure Storage | expo-secure-store |
| Linter/Formatter | Biome.js |
| Testing | Jest + Testing Library |

## Features

- **Login** — Authenticate with email/password via API
- **Balance** — View current account balance with auto-refresh
- **Transfer** — Send money with date scheduling (date picker)
- **History** — View all transfers with filtering by name, value, and date

## Prerequisites

- Node.js >= 20
- Expo CLI (`npm install -g expo-cli`) or use `npx expo`
- iOS Simulator (macOS) or Android Emulator / Expo Go app

## Setup

```bash
npm install
```

## Running

> **Note:** Expo SDK 56 requires a [development build](https://docs.expo.dev/develop/development-builds/introduction/) or the web browser. Expo Go for SDK 56 is not yet available on the Play Store/App Store.

### Quick testing (web)

```bash
npm run web
```

### Development build (Android)

Requires Android Studio with SDK setup.

```bash
npm run android
```

### Development build (iOS)

Requires macOS with Xcode.

```bash
npm run ios
```

### Expo Go (QR code scanning)

```bash
npm start
```

## Testing

```bash
npm test
```

## Linting & Type Checking

```bash
npm run lint
npm run typecheck
```

## Test Credentials

| User | Email | Password |
|---|---|---|
| Gabriel Topaz | gabriel@topaz.com | 1111 |
| Alejo Topaz | alejo@topaz.com | 2222 |
| Wilson Topaz | wilson@topaz.com | 3333 |

## Project Structure

```
BancoXYZ/
├── app/                    # Expo Router routes
│   ├── (auth)/            # Auth screens
│   │   └── login.tsx
│   ├── (tabs)/            # Main tab screens
│   │   ├── index.tsx      # Home / Balance
│   │   ├── transfer.tsx   # New transfer
│   │   └── transfers.tsx  # Transfer history
│   ├── _layout.tsx        # Root layout (providers)
│   └── +not-found.tsx
├── src/
│   ├── api/               # Axios client & endpoints
│   ├── components/        # Reusable UI components
│   ├── constants/         # API URLs & keys
│   ├── hooks/             # TanStack Query hooks
│   ├── store/             # Zustand stores
│   ├── types/             # TypeScript types
│   └── utils/             # Helpers (validation, format, storage)
├── __tests__/             # Unit tests
├── global.css             # Tailwind directives
└── biome.json             # Biome linter config
```

## API Endpoints

- `POST /login` — Authentication
- `GET /balance` — Account balance
- `POST /transfer` — Create transfer
- `GET /transferList` — Transfer history
