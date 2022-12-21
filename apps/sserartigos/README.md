## sserartigos bot

## How to setup sserartigos bot

1. Create a bot and retrieve the token. [How to Get a Discord Bot Token](https://www.writebots.com/discord-bot-token/). It should have the following permissions:

   - Send Messages
   - Read Message History

2. Add token to `.env` file with name `DISCORD_TOKEN`.
3. add a list of IDs from users whose bot should listen on `LISTENED_USERS_ID`.
4. Create you github token. Go to Settings -> Developer Settings -> Personal Access Tokens -> Fine-grained Tokens. And generate your token with the following permissions: "Read access to metadata" and "Read and Write access to code and pull requests".
5. Add your github token on `GITHUB_TOKEN` on your `.env`.
6. Get a repo to let the bot write the commits and put the following vars on your `.env`.
7. Put the owner repo nickname on `GIT_REPO_OWNER`, the repo name goes on `GIT_REPO_NAME`, the branch to commit goes on `GIT_REPO_BRANCH` and the put the file path to write on `ZETTELKASTEN_FILE_PATH`.

For example, if I wanna to write on the `Zettelkasten/Javascript.md` file on my `https://github.com/MarcusXavierr/obsidian/` repository. I would put theses values on env vars.

```env
DISCORD_TOKEN=<YOUR-TOKEN>
GITHUB_TOKEN=<YOUR-TOKEN>
LISTENED_USERS_ID=<ID>,<ID>,<ID>

GIT_REPO_OWNER=MarcusXavierr
GIT_REPO_NAME=obsidian
GIT_REPO_BRANCH=main
Zettelkasten=Zettelkasten/Javascript.md
```
