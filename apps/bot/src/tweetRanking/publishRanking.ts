import { TweetV2PostTweetResult, TwitterApi } from 'twitter-api-v2';

import getTwitterClient from './getTwitterClient';

const hasError = (tweet: TweetV2PostTweetResult) => {
  if (!tweet?.errors?.length) return false;

  console.error('Tweet Ranking failed to publish', {
    tweet,
    errors: tweet.errors,
  });
  return true;
};

const createFirstTweet = async (
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

const createLastTweet = async (
  client: TwitterApi,
  { data: { id: replyTweetId } }: TweetV2PostTweetResult,
): Promise<TweetV2PostTweetResult> =>
  await client.v2.reply(
    `All tweets tagging cc @sseraphini are eligible for ranking.\n \n \nYou can check your personal score there: https://sseraphini.cc/score`,
    replyTweetId,
  );

const publishRanking = async (tweets: any): Promise<void> => {
  try {
    const client = await getTwitterClient();

    if (!client) {
      console.error('Unable to get twitter client');
      return;
    }

    const firstTweet: TweetV2PostTweetResult = await createFirstTweet(client);

    if (hasError(firstTweet)) return;

    const lastRankedTweet: TweetV2PostTweetResult = await createRankingTweets(
      client,
      tweets,
      firstTweet,
    );

    if (hasError(lastRankedTweet)) return;

    const lastTweet = await createLastTweet(client, lastRankedTweet);

    if (hasError(lastTweet)) return;

    console.info('Tweet Ranking published');
  } catch (error) {
    console.error('Tweet Ranking failed to publish', error, { tweets });
  }
};

export default publishRanking;
