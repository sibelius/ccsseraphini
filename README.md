# cc @sseraphini / monorepo

[cc @sseraphini article](https://sibelius.substack.com/p/cc-sseraphini)

## Getting Started

This project uses [classic Yarn 1.x Workspaces](https://classic.yarnpkg.com/en/docs/workspaces)

To setup a local development, you can clone and run Yarn in the root of the project:


```bash
git clone https://github.com/sibelius/ccsseraphini
cd ccsseraphini
yarn install
```

This will install all dependencies for projects inside `apps/`

Now you can use `yarn workspace` API to start a project:

```bash
yarn workspace web dev # this will run 'apps/web/package.json' script called 'dev'
```
