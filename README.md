# cc @sseraphini monorepo

[cc @sseraphini article](https://sibelius.substack.com/p/cc-sseraphini)

This monorepo uses [Yarn Berry](https://github.com/yarnpkg/berry) for repository orchestration.

To use Yarn's latest version, run:

- `yarn set version berry`


## Plugins

To make workspaces a more pleasing experience install these plugins:

- `yarn plugin import workspace-tools` - https://github.com/yarnpkg/berry/tree/master/packages/plugin-workspace-tools

## Running Apps

You can find all apps inside `apps/` and the convention `dev`, `test`, `lint` in all `package.json`.

Because of that, you can use Yarn's `workspace` command with the `name` field from `package.json`:

- `yarn workspace @ccsseraphini/web run dev` - To start the `web` project locally
