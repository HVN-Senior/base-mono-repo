# Base Mono Repo front end using TurboRepo

Powered by Mỹ Toàn Đẹp Trai:

- 🏎 [Turborepo](https://turbo.build/repo) — High-performance build system for Monorepos
- 🚀 [React](https://reactjs.org/) — JavaScript library for user interfaces
- 🛠 [Tsup](https://github.com/egoist/tsup) — TypeScript bundler powered by esbuild ( Coming soon )

As well as a few others tools preconfigured:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Changesets](https://github.com/changesets/changesets) for managing versioning and changelogs ( Coming soon )
- [GitHub Actions](https://github.com/changesets/action) for fully automated package publishing ( Coming soon )

### Useful Commands

- `pnpm build` - Build all packages
- `pnpm dev` - Run all packages locally and preview project
- `pnpm dev:web` - Run NextJS app on apps/web
- `pnpm lint` - Lint all packages
- `pnpm clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

### Install Packages Commands

- `pnpm -w install <your package>` - Install your package in root directory of this project
- `pnpm --filter=<workspace name> install <your package>` - Install your package in your workspace name of this project
- `pnpm workspace <workspace name> install <your package>` - Install your package in your workspace name of this project

## Turborepo

[Turborepo](https://turbo.build/repo) is a high-performance build system for JavaScript and TypeScript codebases. It was designed after the workflows used by massive software engineering organizations to ship code at scale. Turborepo abstracts the complex configuration needed for monorepos and provides fast, incremental builds with zero-configuration remote caching.

Using Turborepo simplifies managing your design system monorepo, as you can have a single lint, build, test, and release process for all packages. [Learn more](https://vercel.com/blog/monorepos-are-changing-how-teams-build-software) about how monorepos improve your development workflow.

## Apps & Packages

This Turborepo includes the following packages and applications:

- `apps/web`: Component documentation site with NextJS 15
- `packages/ui`: Core React components
- `packages/shared-config`: Tailwindcss presets config ( Coming soon )
- `packages/shared-icons`: Core React Icons components ( Coming soon )
- `packages/shared-utils`: Shared React utilities
- `packages/tsconfig`: Shared `tsconfig.json`s used throughout the Turborepo
- `packages/eslint-config`: ESLint preset

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/). Workspaces enables us to "hoist" dependencies that are shared between packages to the root `package.json`. This means smaller `node_modules` folders and a better local dev experience. To install a dependency for the entire monorepo, use the `-w` workspaces flag with `pnpm add`.

This example sets up your `.gitignore` to exclude all generated files, other folders like `node_modules` used to store your dependencies.

## Versioning & Publishing Packages

This example uses [Changesets](https://github.com/changesets/changesets) to manage versions, create changelogs, and publish to npm. It's preconfigured so you can start publishing packages immediately.

You'll need to create an `NPM_TOKEN` and `GITHUB_TOKEN` and add it to your GitHub repository settings to enable access to npm. It's also worth installing the [Changesets bot](https://github.com/apps/changeset-bot) on your repository.

### Releasing

When you push your code to GitHub, the [GitHub Action](https://github.com/changesets/action) will run the `release` script defined in the root `package.json`:

```bash
turbo run build --filter=docs^... && changeset publish
```

Turborepo runs the `build` script for all publishable packages (excluding docs) and publishes the packages to npm. By default, this example includes `repo` as the npm organization. To change this, do the following:

- Rename folders in `packages/*` to replace `repo` with your desired scope
- Search and replace `repo` with your desired scope
- Re-run `pnpm install`

To publish packages to a private npm organization scope, **remove** the following from each of the `package.json`'s

```diff
- "publishConfig": {
-  "access": "public"
- },
```

### Note

- Please use the same version of react or other libraries in ui packages with your own custom web application
- When create a folder contains JSX files, please put it on `content` from `tailwind.config` in ui packages to make sure that your folder can use tailwind css.
