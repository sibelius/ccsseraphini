import { User } from 'types/User';
import { config } from 'config';
import { userTweets } from 'modules/twitter/twitterFollowersGet';
import { userProfile } from 'modules/twitter/twitterUserGet';
import { UserScore, Tweet } from 'types/Score';

interface Result {
  user: User;
  userScore: UserScore;
}

export async function getUserScore(username: string): Promise<Result> {
  const access_token = config.TWITTER_BEARER_TOKEN;
  const twitter_profile_id = config.TWITTER_PROFILE_ID;
  const twitter_profile_user = config.TWITTER_PROFILE_USER;

  if (!access_token) {
    return Promise.reject({
      message: 'Authorization required',
      statusCode: 401,
    });
  }

  if (!twitter_profile_id) {
    return Promise.reject({
      message: 'Twitter profile id is not set',
      statusCode: 500,
    });
  }

  if (!twitter_profile_user) {
    return Promise.reject({
      message: 'Twitter profile user is not set',
      statusCode: 500,
    });
  }

  const { data: user } = await userProfile(username, access_token);

  if (!user) {
    return Promise.reject({
      message: 'User not found',
      statusCode: 404,
    });
  }

  const { data: tweets } = await userTweets(
    user.id as string,
    access_token as string,
  );

  const emptyScore: UserScore = {
    tweet_count: 0,
    retweet_count: 0,
    reply_count: 0,
    like_count: 0,
    quote_count: 0,
    total: 0,
  };

  if (!tweets) {
    return Promise.resolve({
      user,
      userScore: emptyScore,
    });
  }

  const elegibleTweets: Tweet[] = tweets.filter(
    ({ text, in_reply_to_user_id }): boolean => {
      const isReplyingProfileId = in_reply_to_user_id === twitter_profile_id;

      const isProfileUserMentioned = !!text.match(
        new RegExp(`(cc(:?\\s*))?@${twitter_profile_user}`, 'gi'),
      );

      const isRT = !!text.match(/^RT\s@/g);

      return (isProfileUserMentioned || isReplyingProfileId) && !isRT;
    },
  );

  const tweetCount = elegibleTweets.length;
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
      const total = tweetCount + retweets + replies + likes + quotes;

      return {
        tweet_count: tweetCount,
        retweet_count: retweets,
        reply_count: replies,
        like_count: likes,
        quote_count: quotes,
        total,
      };
    },
    emptyScore,
  );

  return {
    user,
    userScore,
  };
}
