# 🥗 IngredientIQ — AI Food Health Scanner

A React + Tailwind app that analyzes food product ingredients and generates a health score using multiple free AI providers.

## ✨ Features
- **Multi-provider AI** — Groq, Google Gemini, OpenRouter, Mistral
- **3 scan modes** — Camera, Image Upload, or Type/Paste ingredients
- **Health Score** — 0–100 score with A+ to F grade
- **Ingredient flags** — each ingredient flagged by concern level
- **Healthier alternatives** suggested automatically
- **Per-provider API keys** — set defaults in .env, override in app Settings

## 🚀 Setup

```bash
npm install
cp .env.example .env   # Add your API keys here
npm run dev            # Runs at http://localhost:5173
```

## 🔑 Free API Keys

| Provider | Free Limit | Sign Up |
|----------|-----------|---------|
| Groq ⭐  | 14,400/day | console.groq.com |
| Gemini   | 250/day    | aistudio.google.com |
| OpenRouter | Varies  | openrouter.ai |
| Mistral  | Free trial | console.mistral.ai |

> Recommended: **Groq** for text. **Gemini** for image scanning.

## 📁 Structure
```
src/
├── components/
│   ├── ui/           Header, ErrorBanner, NoKeyWarning
│   ├── scanner/      CameraScanner, UploadScanner, TextScanner, ScannerTabs
│   ├── results/      ResultsPanel, ScoreCircle, NutritionStrip, IngredientFlags, SummaryCard
│   └── settings/     SettingsPanel
├── context/          SettingsContext (global state)
├── hooks/            useAnalyze, useCamera
├── utils/            api.js (all provider calls)
└── constants/        providers.js (config + prompt)
```

## 🏗️ Build
```bash
npm run build   # Output in dist/
```
Deploy dist/ to Netlify / Vercel / GitHub Pages for full camera support on mobile.
