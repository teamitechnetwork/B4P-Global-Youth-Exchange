# B4P CODEFOUND Global Youth Exchange & Volunteers

A responsive, multi-page information website for the Global Youth Exchange and
Volunteers (GYEV) Program.

## Open and run in VS Code

1. Clone the Git repository and open its root folder in VS Code.
2. Install [pnpm](https://pnpm.io/installation) if it is not already installed.
3. Run `pnpm install`.
4. Start the site with `pnpm dev:gyve`.

The site is available at `http://localhost:5173`. Its source is in
`artifacts/global-youth-exchange/`. The project recommends Prettier and Tailwind
CSS IntelliSense in VS Code.

## Git

The repository includes a `.gitignore` for generated output, dependencies, and
local editor files. To create a new Git repository:

```sh
git init -b main
git add .
git commit -m "Build the GYEV website"
```

You can then connect the repository to GitHub or another Git host.

## Publish with Vercel

Import the repository into Vercel from your Git provider. Keep the project root
as the Vercel Root Directory; `vercel.json` provides the install command, build
command, static output directory, and direct-route fallback.

The site is a static Vite application and does not require a database or secret
environment variables. The current “Get involved” page shares program
information only; it does not collect or submit applications.

## Pages

- `/` — program introduction
- `/about` — B4P CODEFOUND and the program's vision
- `/program` — program components and learning approach
- `/impact` — intended outcomes and focus areas
- `/get-involved` — ways youth, mentors, and community partners can participate

Program details are based on the supplied concept note. The program is planned
to launch in December 2026.

## Social and app links

The footer social profiles and app-store destinations are centralized in
`artifacts/global-youth-exchange/src/lib/site-links.ts`. Replace the empty
Google Play and App Store values with the official B4P Connect listing URLs;
the store badges will then become working links.
