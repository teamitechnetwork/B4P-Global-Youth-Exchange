# B4P CODEFOUND Global Youth Exchange & Volunteers

A responsive information website for the Global Youth Exchange and Volunteers (GYEV) youth leadership initiative.

## Run & Operate

- `pnpm install` — install workspace dependencies
- `pnpm dev:gyve` — run the website at `http://localhost:5173`
- `pnpm --filter @workspace/global-youth-exchange run typecheck` — check the website's TypeScript
- `BASE_PATH=/ PORT=3000 pnpm --filter @workspace/global-youth-exchange run build` — build the static site
- `pnpm run typecheck` — check all workspace packages
- Vercel deployment settings are provided in `vercel.json`

The website does not require a database, API service, or secret environment variables. The shared API and database packages in this workspace are not used by the site.

## Stack

- pnpm workspace, Node.js, TypeScript
- Website: React, Vite, Wouter, Tailwind CSS
- Static deployment: Vercel

## Where things live

- `artifacts/global-youth-exchange/src/` — website routes, components, and styles
- `artifacts/global-youth-exchange/public/images/` — supplied program logo and youth photos
- `artifacts/global-youth-exchange/index.html` — site shell and default sharing metadata
- `vercel.json` — Vercel install, build, output, and SPA route configuration
- `README.md` — VS Code, Git, local development, and Vercel setup

## Architecture decisions

- The program website is static; it does not collect or submit personal information.
- The Get involved page describes participation pathways without inventing application or contact details.
- Browser-history routes use a shared navigation shell and a Vercel rewrite for direct page visits.

## Product

The site introduces GYEV, explains its vision and program structure, describes intended outcomes, and provides guidance for youth, mentors, and community partners. The program is planned to launch in December 2026.

## User preferences

- Build a multi-page website with a clean user interface and experience.
- Keep the project ready for Git, Vercel, and VS Code.

## Gotchas

- Vite defaults to port `5173` and base path `/` for local development; Replit supplies its own values through the managed workflow.
- Set `BASE_PATH=/` for root-domain Vercel builds; `vercel.json` already does this.
- Update `index.html` and `Metadata` in `src/App.tsx` if the public organization name, launch date, or site description changes.

## Pointers

- See `README.md` for setup instructions.
- See the `pnpm-workspace` skill for workspace conventions.
