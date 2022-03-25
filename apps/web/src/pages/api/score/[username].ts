import { userProfile } from 'modules/twitter/twitterUserGet';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserScore, Tweet } from 'types/Score';
import { User } from 'types/User';
import { config } from '../../../config';
import { userTweets } from '../../../modules/twitter/twitterFollowersGet';

export default async function userScoreHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username } = req.query;

  const emptyScore: UserScore = {
    tweet_count: 0,
    retweet_count: 0,
    reply_count: 0,
    like_count: 0,
    quote_count: 0,
    total: 0,
  };

  const access_token = config.TWITTER_BEARER_TOKEN;
  if (!access_token) {
    return res.status(401).json({
      message: 'Authorization required',
    });
  }

  if (!config.TWITTER_PROFILE_ID || !config.TWITTER_PROFILE_USER) {
    return res.status(500).json({
      message: 'Something is wrong',
    });
  }

  const userResult = await userProfile(username as string, access_token);

  if (!userResult.data) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  const { data: user } = userResult;

  const result = await userTweets(user.id as string, access_token as string);

  if (!result.data) {
    return res.status(200).json({
      scoreDetail: emptyScore,
    });
  }

  const { data } = result;
  const elegibleTweets: Tweet[] = data.filter((tweet): boolean => {
    const { text, in_reply_to_user_id } = tweet;

    const isReplyingProfileId =
      in_reply_to_user_id === config.TWITTER_PROFILE_ID;

    const isProfileUserMentioned = !!text.match(
      new RegExp(`(cc(:?\\s*))?@${config.TWITTER_PROFILE_USER}`, 'gi'),
    );
    const isRT = !!text.match(/^RT\s@/g);

    return (isProfileUserMentioned || isReplyingProfileId) && !isRT;
  });

  const tweets = elegibleTweets.length;
  const userScore: UserScore = elegibleTweets.reduce(
    (
      accumulator: UserScore,
      {
        public_metrics: { retweet_count, reply_count, like_count, quote_count },
      }: Tweet,
    ): UserScore => {
      const retweets = retweet_count + accumulator.retweet_count;
      const replies = reply_count + accumulator.reply_count;
      const likes = like_count + accumulator.like_count;
      const quotes = quote_count + accumulator.quote_count;
      const total = retweets + replies + likes + quotes;

      const currentUserScore = {
        tweet_count: tweets,
        retweet_count: retweets,
        reply_count: replies,
        like_count: likes,
        quote_count: quotes,
        total,
      };

      return currentUserScore;
    },
    emptyScore,
  );

  userScore.total =
    userScore.tweet_count +
    userScore.retweet_count +
    userScore.reply_count +
    userScore.like_count +
    userScore.quote_count;

  return res.status(200).json({
    userScore,
    user,
  });
}
