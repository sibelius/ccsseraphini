# sseramemes

## How to setup sseramemes

1. Create a bot and retrieve the token. [How to Get a Discord Bot Token](https://www.writebots.com/discord-bot-token/). It should have the following permissions:

   - Send Messages
   - Read Message History

1. Add token to `.env` file with name `DISCORD_TOKEN`.

1. Get memes channel id from Discord and add it to `.env` file with name `DISCORD_CHANNEL_ID`.

1. Go to Twitter developer portal and retrieve the tokens and save them to `.env`:
   - `TWITTER_ACCESS_TOKEN`
   - `TWITTER_ACCESS_TOKEN_SECRET`
   - `TWITTER_API_KEY`
   - `TWITTER_API_KEY_SECRET`
