# Investone AI

AI-powered investment platform — frontend service for the Securities Market TechSprint.

## Tech stack

- **Framework:** Next.js 16 + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Components:** Radix UI + shadcn/ui pattern (CVA)
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Setup

> Run all commands from inside the `investone-ai/` directory.

```bash
cd investone-ai
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
investone-ai/
├── app/
│   ├── (auth)/         # login, signup
│   ├── (app)/          # authenticated routes
│   │   ├── dashboard/
│   │   ├── portfolio/
│   │   ├── ai-assistant/
│   │   ├── explorer/
│   │   ├── risk-analysis/
│   │   ├── health-score/
│   │   ├── goals/
│   │   ├── alerts/
│   │   ├── learning/
│   │   ├── profile/
│   │   ├── settings/
│   │   └── admin/
│   └── globals.css     # design tokens + global utilities
├── components/
│   ├── ui/             # base components (Button, Card, Input, …)
│   ├── shared/         # layout components (Sidebar, TopBar, …)
│   ├── charts/
│   ├── dashboard/
│   ├── landing/
│   └── portfolio/
└── lib/                # utilities
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
