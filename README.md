# Securities Market TechSprint

A frontend prototype for a unified multi-asset investment dashboard ("InvestOne AI"), built for the Securities Market TechSprint hackathon.

## Repository structure

```
Securities-Market-TechSprint/
├── README.md
└── investone-ai/   # Next.js frontend — the entire application
```

There is currently only one application in this repository. It is a **frontend-only prototype**: no backend, database, authentication, or live AI integration exists yet. See [`investone-ai/README.md`](./investone-ai/README.md) for the full audited setup, environment, deployment, and status details.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16.3.0 (App Router, Turbopack), React 19.2.4, TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI components | Radix UI + shadcn/ui-style wrappers |
| Charts | Recharts |
| Animation | Framer Motion |
| Backend / Database / Auth / AI | None — see [Project Status](./investone-ai/README.md#project-status) |
| Deployment | Vercel (frontend only) |

Full breakdown in [`investone-ai/README.md` → Tech Stack](./investone-ai/README.md#tech-stack).

## How to Run

Prerequisites: Node.js 20+ and npm 10+.

```bash
git clone https://github.com/Koushik744/Securities-Market-TechSprint.git
cd Securities-Market-TechSprint/investone-ai
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables, database, or second service to start — it's a single static frontend.

Other useful commands (run from `investone-ai/`):

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint     # ESLint
npx tsc --noEmit  # TypeScript check
```

## Deployment

The GitHub project page lists `https://securities-market-tech-sprint.vercel.app` as the deployment. As of the last audit, that URL returns `404: DEPLOYMENT_NOT_FOUND`. See the [Deployment](./investone-ai/README.md#deployment) and [Troubleshooting](./investone-ai/README.md#troubleshooting) sections of the app README for the likely cause (missing Vercel "Root Directory" setting) and fix.
