# ts-monorepo-setup
A monorepo configuration for Typescript using the latest ESLint, Prettier, pre-commit, Git Actions to use in any starting project. These tools setup the guardrails for AIs

## Architecture
The monorepo contains different apps and packages at the root level. You can add more new ones if needed.

- **backend:** A NestJS (Node.js) backend app
- **frontend:** A React (Vite) frontend app


## pnpm setup

- **Update:** `pnpm self-update`
- **Use latest version:** `npm uninstall -g pnpm` (tells the updater to prioritize its own installation)
