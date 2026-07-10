# ts-monorepo-setup

A monorepo configuration for Typescript using the latest ESLint, Prettier, pre-commit, Git Actions to use in any starting project. These tools setup the guardrails for AIs

## Style

1. **ESLint:** latest version (>v10) + Airbnb style guide + React + NestJS
2. **Prettier:** latest version (>v3) + Airbnb style guide
3. **Husky:** pre-commit hooks for linting and formatting
4. **Commitlint:** commit message linting with conventional commits: feat|chore|fix(module): message

## Architecture

The monorepo contains different apps and packages at the root level. You can add more new ones if needed.

- **backend:** A NestJS (Node.js) backend app
- **frontend:** A React (Vite) frontend app

## pnpm setup

- **Update:** `pnpm self-update`
- **Use latest version:** `npm uninstall -g pnpm` (tells the updater to prioritize its own installation)
