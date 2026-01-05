# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

赛博问卜 (Cyber Fortune) - A psychological state assessment web app with cyberpunk aesthetics. Users answer 3 questions to receive a personalized "fortune" based on their current mental state.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Build static export (outputs to /out)
npm run lint     # Run ESLint
```

## Architecture

### Tech Stack
- Next.js 14 (App Router, static export mode)
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- html-to-image for PNG export

### Page Flow
```
EntryPage → QuestionPage (×3) → LoadingPage → ResultPage → SharePage → ExitPage
```

State machine controlled by `page` state in `app/page.tsx`. All state is centralized there using React hooks (`useState`).

### Key Files
- `app/page.tsx` - Main component, all state management and page routing
- `data/fortune.ts` - All types, questions, result content, and helper functions
- `components/` - 6 page components (EntryPage, QuestionPage, LoadingPage, ResultPage, SharePage, ExitPage)
- `app/globals.css` - Custom CSS classes (`.card`, `.btn-primary`, `.option-btn`, `.stamp`) and animations
- `tailwind.config.ts` - Custom color system with Chinese poetic names (ink, moon, accent)

### Scoring System
- 3 questions, each option scores 0-2 points
- Total score (0-6) maps to result type:
  - 0-2: `hidden_drain` (隐性消耗期)
  - 3-4: `recovery` (低谷回升期)
  - 5-6: `transition` (转运前混乱期)
- Each result type has arrays of judgements, scenes, comforts, and tags randomly selected

### Share Cards
Three card styles in SharePage: `minimal` (素雅), `ink` (水墨), `seal` (印章). Uses html-to-image to export as PNG.

### Tailwind Color System
Custom semantic colors defined in `tailwind.config.ts`:
- `ink-*` (void/night/deep/medium/light) - Background layers
- `moon-*` (white/gray/mist) - Text colors
- `accent-*` (gold/vermilion) - Accent colors for highlights and stamps

### Build Configuration
Static export mode (`output: 'export'` in next.config.js) - no API routes or SSR available.
