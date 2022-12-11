import { TweetV2PostTweetResult, TwitterApi } from 'twitter-api-v2';

import getTwitterClient from './getTwitterClient';
import { RankedTweet, Stats } from './types/index';

const hasError = (tweet: TweetV2PostTweetResult) => {
  if (!tweet?.errors?.length) return false;
  console.error('Previous tweet has errors...', { tweet });
  console.table(tweet.errors);

  return true;
};

const getDateString = (date: Date): string =>
  date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

const createInitialTweet = async (
  client: TwitterApi,
  { since, until }: Stats,
): Promise<TweetV2PostTweetResult> => {
  const strSince = getDateString(since);
  const strUntil = getDateString(until);
  const lines = [
    '🏆 Check out here the `cc @sseraphini` top tweets! 🏆\n',
    `since ${strSince}, until ${strUntil}`,
    '#sserarank #sserapoints',
    '\n\n🧵⬇️',
  ];
  const text = lines.join('\n');
  const tweet = await client.v2.tweet(text);

  return tweet;
};

const retryReply = async (
  client: TwitterApi,
  text: string,
  { data: { id: replyTweetId } }: TweetV2PostTweetResult,
  times: number = 3,
): Promise<TweetV2PostTweetResult> => {
  if (times === 0) throw new Error('Failed to reply');

  try {
    console.info(`Retrying to reply, times left: ${times}`);
    const tweet = await client.v2.reply(text, replyTweetId);

    return tweet;
  } catch (error) {
    console.error('Failed to reply, retrying...', error);
    const tweet = { data: { id: replyTweetId } } as TweetV2PostTweetResult;

    return retryReply(client, text, tweet, times - 1);
  }
};

const createStatsTweet = async (
  client: TwitterApi,
  { data: { id: replyTweetId } }: TweetV2PostTweetResult,
  stats: Stats,
): Promise<TweetV2PostTweetResult> => {
  const {
    mentions,
    likes,
    retweets,
    replies,
    quotes,
    newAuthors,
    uniqueAuthors,
  }: Stats = stats;

  const lines = [
    'First, today stats:\n',
    `📧 Mentions: ${mentions}\n`,
    `💙 Likes: ${likes}\n`,
    `🔁 Retweets: ${retweets}\n`,
    `💬 Replies: ${replies}\n`,
    `🔃 Quotes: ${quotes}\n`,
    `🆕 New users: ${newAuthors}\n`,
    `⏩ Total users: ${uniqueAuthors}`,
  ];

  const text = lines.join('\n');
  const tweet = await client.v2.reply(text, replyTweetId);

  return tweet;
};

const createRankingTweets = async (
  client: TwitterApi,
  tweets: RankedTweet[],
  firstTweet: TweetV2PostTweetResult,
): Promise<TweetV2PostTweetResult> => {
  let replyTweet: TweetV2PostTweetResult = firstTweet;
  let position = 1;

  const positionEmote: string[] = [
    '1️⃣',
    '2️⃣',
    '3️⃣',
    '4️⃣',
    '5️⃣',
    '6️⃣',
    '7️⃣',
    '8️⃣',
    '9️⃣',
    '🔟',
  ];

  for await (const tweet of tweets) {
    const { tweet_id, score } = tweet;
    const emote = positionEmote[position - 1] ?? '#️⃣';
    const text = `${emote}º Tweet - ${score} sserapoints https://twitter.com/_/status/${tweet_id}`;

    const {
      data: { id: replyTweetId },
    } = replyTweet;

    try {
      replyTweet = await client.v2.reply(text, replyTweetId);
    } catch (error) {
      replyTweet = await retryReply(client, text, replyTweet);
    }

    if (hasError(replyTweet)) break;

    position++;
  }

  return replyTweet;
};

const createFinalTweet = async (
  client: TwitterApi,
  { data: { id: replyTweetId } }: TweetV2PostTweetResult,
): Promise<TweetV2PostTweetResult> => {
  const lines = [
    'All tweets tagging `cc @sseraphini` are eligible for ranking.',
    '\n\n',
    'You can check your personal score there: https://sseraphini.cc/score',
  ];
  const text = lines.join('\n');

  try {
    const tweet = await client.v2.reply(text, replyTweetId);

    return tweet;
  } catch (error) {
    const replyTweet = { data: { id: replyTweetId } } as TweetV2PostTweetResult;
    const tweet = await retryReply(client, text, replyTweet);

    return tweet;
  }
};

const publishRanking = async (
  tweets: RankedTweet[],
  stats: Stats,
  config: Record<string, string>,
): Promise<void> => {
  try {
    const client = await getTwitterClient(config);
    if (!client) {
      console.error('Unable to get twitter client');
      return;
    }

    const initialTweet: TweetV2PostTweetResult = await createInitialTweet(
      client,
      stats,
    );

    if (hasError(initialTweet)) return;
    const statsTweet: TweetV2PostTweetResult = await createStatsTweet(
      client,
      initialTweet,
      stats,
    );

    if (hasError(statsTweet)) return;
    const lastRankedTweet: TweetV2PostTweetResult = await createRankingTweets(
      client,
      tweets,
      statsTweet,
    );

    if (hasError(lastRankedTweet)) return;
    const lastTweet: TweetV2PostTweetResult = await createFinalTweet(
      client,
      lastRankedTweet,
    );

    if (hasError(lastTweet)) throw 'Fail to create final tweet';

    console.info('Tweet Ranking published!\n');
  } catch (error) {
    console.error('Tweet Ranking failed to publish', error);
  }
  console.table(tweets);
};

export default publishRanking;
