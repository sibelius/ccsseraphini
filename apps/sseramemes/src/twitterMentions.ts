import { TextChannel } from 'discord.js';
import { Client } from 'twitter-api-sdk';

const client = new Client(process.env.TWITTER_BEARER_TOKEN);

async function* mentionsStream() {
  const rules = await client.tweets.getRules();

  if (rules.data) {
    const ids = rules.data.map((rule) => rule.id);

    await client.tweets.addOrDeleteRules(
      {
        delete: {
          ids,
        },
      },
      {
        dry_run: false,
      },
    );
  }

  await client.tweets.addOrDeleteRules(
    {
      add: [
        {
          value: '-RT @sseramemes -is:reply -is:retweet',
        },
      ],
    },
    {
      dry_run: false,
    },
  );

  const stream = client.tweets.searchStream({
    'tweet.fields': [
      'attachments',
      'author_id',
      'id',
      'text',
      'created_at',
      'public_metrics',
    ],
    'user.fields': ['profile_image_url', 'url', 'username'],
    expansions: ['author_id', 'attachments.media_keys'],
    'media.fields': [
      'height',
      'media_key',
      'public_metrics',
      'type',
      'url',
      'width',
    ],
  });

  for await (const tweet of stream) {
    yield tweet;
  }
}

const twitterBaseUrl = 'https://twitter.com/';

const getTweetUrl = (tweet: any) => {
  const author = tweet.includes.users.find(
    (user) => user.id === tweet.data.author_id,
  );

  const tweetUrl = `${twitterBaseUrl}${author.username}/status/${tweet.data.id}`;

  return tweetUrl;
};

export const listenToMentions = async (memeChannel: TextChannel) => {
  for await (const tweet of mentionsStream()) {
    const tweetUrl = getTweetUrl(tweet);
    await memeChannel.send(`🔁 ${tweetUrl}`);
  }
};
