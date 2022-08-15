import { TweetV2PostTweetResult, TwitterApi } from 'twitter-api-v2';

import getTwitterClient from './getTwitterClient';
import { RankedTweet } from './types';

const hasError = (tweet: TweetV2PostTweetResult) => {
  if (!tweet?.errors?.length) return false;

  console.error('Tweet Ranking failed to publish', {
    tweet,
    errors: tweet.errors,
  });
  return true;
};

const createInitialTweet = async (
  client: TwitterApi,
): Promise<TweetV2PostTweetResult> =>
  await client.v2.tweet(
    '🏆 Check out here the `cc @sseraphini` top tweets from the last 24 hours 🏆\n \n \n \n \n🧵⬇️',
  );

const createRankingTweets = async (
  client: TwitterApi,
  tweets: any[],
  firstTweet: TweetV2PostTweetResult,
): Promise<TweetV2PostTweetResult> => {
  let position = 1;
  let replyTweet: TweetV2PostTweetResult = firstTweet;

  for await (const tweet of tweets) {
    const { id: tweetId } = tweet;
    const text = `${position}º Tweet - ${tweet.score} sserapoints\n\n\n https://twitter.com/_/status/${tweetId}`;

    const {
      data: { id: replyTweetId },
    } = replyTweet;
    replyTweet = await client.v2.reply(text, replyTweetId);

    if (hasError(replyTweet)) break;

    position++;
  }

  return replyTweet;
};

const createInfoTweet = async (
  client: TwitterApi,
  { data: { id: replyTweetId } }: TweetV2PostTweetResult,
  total: number,
): Promise<TweetV2PostTweetResult> =>
  await client.v2.reply(
    `Today we had ${total} tweets tagging cc @sseraphini.`,
    replyTweetId,
  );

const createFinalTweet = async (
  client: TwitterApi,
  { data: { id: replyTweetId } }: TweetV2PostTweetResult,
): Promise<TweetV2PostTweetResult> =>
  await client.v2.reply(
    `All tweets tagging cc @sseraphini are eligible for ranking.\n \n \nYou can check your personal score there: https://sseraphini.cc/score`,
    replyTweetId,
  );

const publishRanking = async (
  tweets: RankedTweet[],
  totalTweets: number,
): Promise<void> => {
  try {
    const client = await getTwitterClient();

    if (!client) {
      console.error('Unable to get twitter client');
      return;
    }

    const initialTweet: TweetV2PostTweetResult = await createInitialTweet(
      client,
    );

    if (hasError(initialTweet)) return;

    const lastRankedTweet: TweetV2PostTweetResult = await createRankingTweets(
      client,
      tweets,
      initialTweet,
    );

    if (hasError(lastRankedTweet)) return;

    const infoTweet: TweetV2PostTweetResult = await createInfoTweet(
      client,
      lastRankedTweet,
      totalTweets,
    );

    if (hasError(infoTweet)) return;

    const lastTweet: TweetV2PostTweetResult = await createFinalTweet(
      client,
      infoTweet,
    );

    if (hasError(lastTweet)) return;

    console.info('Tweet Ranking published');
  } catch (error) {
    console.error('Tweet Ranking failed to publish', error, { tweets });
  }
};

export default publishRanking;
