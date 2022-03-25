import { NextApiRequest, NextApiResponse } from 'next';
import { TweetData } from 'types/Tweet';

// Learn Discord Webhook: https://discord.com/developers/docs/resources/webhook#execute-webhook

const floodDiscordChannelWithTweets = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  // TODO add auth method, only cron job can access this endpoint
  // TODO handle with discord rate limit
  // cron will trigger the API every 1 minute
  // get the lastest tweets

  const query = '-RT cc @sseraphini';

  // TODO Dry this code, we have the same code: ccsseraphini/apps/web/src/pages/index.tsx
  const httpProtocol = req.headers.host?.includes('localhost')
    ? 'http'
    : 'https';

  const url = `${httpProtocol}://${req.headers.host}/api/tweets?query=${query}`;

  const response = await fetch(url);

  if (response.status !== 200)
    res.status(500).send("I can't get the tweets, try again later");

  const data = await response.json();

  const WEB_HOOK = process.env.WEB_HOOK_DISCORD as string;

  if (!WEB_HOOK) res.status(500).send('WEB_HOOK_DISCORD .env is not defined');

  const promises = data.tweets.map((tweet: TweetData) => {
    return fetch(WEB_HOOK, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        content: `https://twitter.com/${tweet.userInfo.username}/status/${tweet.id}`,
      }),
    });
  });

  try {
    // TODO handle with discord rate limit
    await Promise.all(promises);
    res.status(204).send({ success: true });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export default floodDiscordChannelWithTweets;
