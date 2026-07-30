# VocabLearn - Vocabulary Learning Platform

VocabLearn is a modern, responsive, multi-lingual vocabulary learning web application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS 4**. It empowers users to expand their English vocabulary through structured daily lessons, interactive study cards, multi-mode quizzes, and real-time progress statistics.

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
- **⌨️ Keyboard Shortcuts**: Built-in keyboard navigation for fast flashcard studying (`Arrow Keys`, `Space`, `Enter`, `F`).
- **📊 Detailed Statistics**: Comprehensive dashboard displaying study streaks, accuracy percentages, known vs. unknown word ratios, and completion metrics.
- **💾 Local Storage Persistence**: User progress, favorite words, quiz history, and preferences are automatically saved locally in the browser.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Class Variance Authority](https://cva.style/docs)
- **Icons & Animations**: [Lucide React](https://lucide.dev/) & [Framer Motion](https://www.framer.com/motion/)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)

---

## 📁 Project Structure

```text
vocabulary-learning-platform/
├── app/                  # Next.js App Router routes & layouts
│   ├── daily/            # Daily lessons overview & study pages
│   ├── quiz/             # Quiz configuration & active quiz player
│   ├── statistics/       # User learning stats dashboard
│   ├── words/            # Full vocabulary list with search/filter/sort
│   ├── globals.css       # Global styles & theme color tokens
│   └── layout.tsx        # Root application layout
├── components/           # Reusable UI components & cards
│   └── ui/               # Primitive design system elements (Button, Card, Input, etc.)
├── data/                 # Local vocabulary dataset (JSON)
├── hooks/                # Custom React hooks (state, local storage, shortcuts)
├── lib/                  # Utilities, i18n translation maps, & constants
└── types/                # TypeScript interface definitions
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.0.0` or higher
- **Package Manager**: `npm` (v10+) or `yarn` / `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/vocabulary-learning-platform.git
   cd vocabulary-learning-platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` (optional setup):
   ```bash
   cp .env.example .env
   ```

---

## 💻 Running the Application

### Development Server

Start the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality Checks & Verification

Run TypeScript compilation check:
```bash
npx tsc --noEmit
```

Run ESLint checks:
```bash
npm run lint
```

### Production Build

Create an optimized production build:
```bash
npm run build
```

Start the production server:
```bash
npm run start
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

© **All Rights Reserved** — Eng: **Abdulrahaman Hamdi**