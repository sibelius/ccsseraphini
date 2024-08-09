# cc @sseraphini / monorepo

[cc @sseraphini article](https://sibelius.substack.com/p/cc-sseraphini)

## Getting Started

This project uses [classic pnpm 1.x Workspaces](https://classic.yarnpkg.com/en/docs/workspaces)

To setup a local development, you can clone and run pnpm in the root of the project:

```bash
git clone https://github.com/sibelius/ccsseraphini
cd ccsseraphini
pnpm install
```

This will install all dependencies for projects inside `apps/`

Now you can use `pnpm workspace` API to start a project:

```bash
pnpm workspace web dev # this will run 'apps/web/package.json' script called 'dev'
```
