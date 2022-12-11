# cc sseraphini bot

## How to setup cc sseraphini bot

1. Create a bot and retrieve the token. [How to Get a Discord Bot Token](https://www.writebots.com/discord-bot-token/). It should have the following permissions:

   - Send Messages
   - Read Message History

1. Add token to `.env` file with name `DISCORD_TOKEN`.

1. Get channel id from Discord and add it to `.env` file with name `DISCORD_CHANNEL_ID`.

1. Get general channel id from Discord and add it to `.env` file with name `DISCORD_GENERAL_CHANNEL_ID`.

1. Go to Twitter developer portal and retrieve the tokens and save them to `.env`:

   - `TWITTER_ACCESS_TOKEN`
   - `TWITTER_ACCESS_TOKEN_SECRET`
   - `TWITTER_API_KEY`
   - `TWITTER_API_KEY_SECRET`

1. You can use same twitter credentials to fill tweet ranking envs too
   - `TWITTER_RANKING_ACCESS_TOKEN`
   - `TWITTER_RANKING_ACCESS_TOKEN_SECRET`
   - `TWITTER_RANKING_API_KEY`
   - `TWITTER_RANKING_API_KEY_SECRET`

## How to run

```
yarn start
```
