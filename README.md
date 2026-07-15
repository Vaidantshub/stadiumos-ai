# 🏆 StadiumOS AI — FIFA World Cup 2026

An AI-powered fan experience & crowd-intelligence platform built for the FIFA World Cup 2026 Hackathon.

**Live features:** AI Fan Assistant · Organizer Dashboard · Crowd Heatmap · Stadium Navigation ·
Emergency Assistant · Transport Recommendations · Accessibility Mode · Multilingual Support (6 languages)

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui + Framer Motion |
| AI | Google Gemini 2.5 Flash (`@google/generative-ai`) |
| Maps | Google Maps JavaScript API (`@react-google-maps/api`) |
| Auth & DB | Firebase Auth + Firestore |
| Charts | Recharts |
| State | Zustand (persisted) |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── fan/                  # AI Fan Assistant
│   ├── dashboard/             # Organizer Dashboard
│   ├── heatmap/               # Crowd Heatmap
│   ├── navigate/               # Stadium Navigation (Google Maps)
│   ├── transport/              # Transport Recommendations
│   ├── emergency/              # Emergency Assistant
│   └── api/
│       ├── assistant/route.ts        # Gemini: Fan Assistant
│       ├── emergency/route.ts        # Gemini: Emergency guidance
│       └── organizer-insight/route.ts # Gemini: Organizer AI insights
├── components/
│   ├── ui/          # shadcn/ui primitives (button, card, dialog, select...)
│   ├── layout/       # Navbar, Footer, Providers
│   ├── assistant/     # Chat UI
│   ├── dashboard/      # Charts, stat cards, alerts feed
│   ├── heatmap/         # Zone cards, schematic stadium map
│   ├── navigation/       # Google Maps view, route finder
│   ├── transport/         # Transport option cards
│   ├── emergency/          # Emergency report form
│   └── shared/               # Reusable section/feature components
└── lib/
    ├── types/          # Shared TypeScript domain types
    ├── data/            # Mock FIFA 2026 stadium/match/transport data
    ├── gemini/           # Gemini client + system prompts
    ├── firebase/          # Firebase config + auth helpers
    ├── i18n/                # Translation dictionary (6 languages)
    └── store/                 # Zustand global app store
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

| Variable | Where to get it |
|---|---|
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | [Google Cloud Console](https://console.cloud.google.com/) → enable "Maps JavaScript API" |
| `NEXT_PUBLIC_FIREBASE_*` | [Firebase Console](https://console.firebase.google.com/) → Project Settings → General |

> **Note:** The app runs in full **demo mode** without any keys — Gemini API routes return
> graceful fallback responses, the schematic stadium map still works without Google Maps,
> and Firebase Auth simply stays signed-out. This makes it deployable and demo-able instantly.

### 3. Run locally
```bash
npm run dev
```
Visit `http://localhost:3000`.

### 4. Build for production
```bash
npm run build && npm start
```

---

## ☁️ Deploying to Vercel

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables from `.env.example` in the Vercel project settings.
4. Deploy — Vercel auto-detects Next.js. No extra config required.

---

## 🔐 Firebase Setup (optional, for Auth + Firestore)

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/).
2. Enable **Authentication** → Sign-in providers: Google + Anonymous.
3. Enable **Firestore Database** in production mode.
4. Copy your web app config into `.env.local`.

Suggested Firestore security rules (starter):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 🌍 Multilingual Support

Language strings live in `src/lib/i18n/translations.ts`. Supported: English, Español, Français,
العربية (RTL), Português, Deutsch. Switch languages via the globe icon in the navbar — the choice
persists across sessions and is passed to Gemini so AI responses match the selected language.

## ♿ Accessibility Mode

Toggle via the accessibility icon in the navbar. Applies a global `.a11y-mode` class that increases
base font size and strengthens focus rings for keyboard/screen-reader users.

---

## 🏟️ Mock Data

Five FIFA World Cup 2026 host stadiums (MetLife, Estadio Azteca, BC Place, SoFi, AT&T Stadium) with
12 zones each (seating, concourses, gates, concessions, restrooms, parking), sample matches, transport
options, and emergency reports live in `src/lib/data/`. Swap these for real APIs/Firestore collections
as the backend matures.

---

Built with ❤️ for the FIFA World Cup 2026 Hackathon.
