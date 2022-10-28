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

Once you have all the tokens, you can run the bot with `yarn start`.

## Server

We use PM2 to run and keep sseramemes online. To start the server, run:

```bash
yarn server:start
```

To check the logs, run:

```bash
yarn server:logs
```

If you want to check only error logs, run:

```bash
yarn server:logs --err
```

To check PM2 status, run:

```bash
pm2 status
```

## CI/CD

As we're running on a EC2 instance, our deploy is a PM2 watch plus a cronjob to pull git changes. On crontab, we have:

```bash
*/1 * * * * cd ~/ccsseraphini && git pull >/dev/null 2>&1
```
