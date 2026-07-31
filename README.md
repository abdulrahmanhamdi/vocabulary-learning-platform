# VocabLearn - Vocabulary Learning Monorepo

VocabLearn is a modern, responsive, multi-lingual vocabulary learning platform that shares core business logic between a **Next.js 16 Web Application** and a **React Native + Expo Mobile Application** through a monorepo architecture. 

It empowers users to expand their English vocabulary through structured daily lessons, interactive study cards, multi-mode quizzes, and real-time progress statistics.

---

## 🌟 Key Features

- **📚 Structured Daily Lessons**: Organize study sessions into digestible daily lessons with progress completion status.
- **🃏 Interactive Flashcards**: Study words with toggleable translations, audio pronunciation placeholders, and quick status tagging (Known/Favorite).
- **📝 Multi-Mode Quiz Engine**: Test your knowledge across multiple directional modes:
  - English → Turkish
  - English → Arabic
  - Turkish → English
  - Arabic → English
- **🌐 Trilingual Localization**: Complete UI localization support for **English**, **Türkçe**, and **العربية (RTL)**.
- **🎨 Modern Dual Themes**: Fluid Light Mode (`#f2f2f2`) and Dark Mode (`#1a202c`) built with dynamic design tokens.
- **⌨️ Keyboard Shortcuts**: Built-in keyboard navigation for fast flashcard studying (`Arrow Keys`, `Space`, `Enter`, `F`) in the web app.
- **📊 Detailed Statistics**: Comprehensive dashboard displaying study streaks, accuracy percentages, known vs. unknown word ratios, and completion metrics.
- **💾 Local Storage Persistence**: User progress, favorite words, quiz history, and preferences are automatically saved locally (IndexedDB/LocalStorage on Web, MMKV on Mobile).

---

## 🛠️ Tech Stack & Monorepo Architecture

### Monorepo Workspaces
- **`apps/web`**: Next.js 16 Web App.
- **`apps/mobile`**: React Native + Expo Mobile App.
- **`packages/shared`**: Shared logic, constants, types, and datasets.

### Core Technologies
- **Monorepo Manager**: NPM Workspaces
- **Shared Code (`packages/shared`)**: TypeScript compilation (`tsc`), Zod
- **Web App (`apps/web`)**: Next.js 16 (App Router & Turbopack), React 19, Tailwind CSS 4, next-themes, Framer Motion, Lucide Icons
- **Mobile App (`apps/mobile`)**: React Native (0.86+), Expo SDK 57+, Expo Router (File-based navigation), Zustand, TanStack Query, MMKV (Fast local storage), React Native Paper, React Native Elements, Expo AV (Audio), Expo Haptics, Expo Secure Store

---

## 📁 Project Structure

```text
vocabulary-learning-platform/
├── apps/
│   ├── web/                  # Next.js 16 Web Application
│   │   ├── app/              # Next.js App Router routes & layouts
│   │   ├── components/       # Web-specific components
│   │   ├── hooks/            # Web custom hooks
│   │   └── package.json
│   └── mobile/               # React Native + Expo Mobile Application
│       ├── app/              # Expo Router pages
│       ├── src/              # Mobile app source code
│       └── package.json
├── packages/
│   └── shared/               # Shared logic package
│       ├── src/
│       │   ├── constants/    # Shared constant values
│       │   ├── data/         # Shared static vocabulary dataset (all-words.json)
│       │   ├── types/        # TypeScript interface definitions
│       │   └── index.ts      # Shared package entrypoint
│       └── package.json
├── scripts/
│   └── clean.js              # Cross-platform cleanup utility
├── package.json              # Workspace root package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.0.0` or higher
- **Package Manager**: `npm` (v10+)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/vocabulary-learning-platform.git
   cd vocabulary-learning-platform
   ```

2. **Install dependencies**:
   This command installs dependencies for all workspaces and automatically builds the `@vocabulary/shared` package:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` inside `apps/web` (optional setup):
   ```bash
   cp .env.example apps/web/.env
   ```

---

## 💻 Development Commands

All commands can be run directly from the monorepo root directory.

### Web Application

Start the web development server (with Turbopack):
```bash
npm run dev
# or
npm run web:dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

Build the web application:
```bash
npm run web:build
```

Start the built production server:
```bash
npm run web:start
```

### Mobile Application

Start the Expo development server:
```bash
npm run mobile:start
```

Run on an Android device/emulator:
```bash
npm run mobile:android
```

Run on an iOS device/simulator:
```bash
npm run mobile:ios
```

Run the mobile app in a web browser:
```bash
npm run mobile:web
```

### Shared Logic & Utilities

Build the shared package manually:
```bash
npm run shared:build
```

Clean the workspace (removes all `node_modules`, lockfiles, and build artifacts cross-platform):
```bash
npm run clean
```

### Quality Control

Lint the workspace:
```bash
npm run lint
```

Format the workspace using Prettier:
```bash
npm run format
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

© **All Rights Reserved** — Eng: **Abdulrahaman Hamdi**