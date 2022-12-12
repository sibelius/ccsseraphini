import { User } from 'types/User';
import { config } from 'config';
import { userProfile } from 'modules/twitter/twitterUserGet';
import { UserScore } from 'types/Score';
import { getRankingScore } from './getRankingScore';

interface Result {
  user: User;
  userScore: UserScore;
}

export async function getUserScore(username: string): Promise<Result> {
  const {
    TWITTER_BEARER_TOKEN: access_token,
    TWITTER_PROFILE_ID: twitter_profile_id,
    TWITTER_PROFILE_USER: twitter_profile_user,
  } = config;

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

  if (!user.id) {
    return Promise.reject({
      message: 'User not found',
      statusCode: 404,
    });
  }

  const { score, tweets, likes, retweets, replies, quotes } =
    await getRankingScore(user.id);

  const userScore: UserScore = {
    like_count: likes,
    quote_count: quotes,
    reply_count: replies,
    retweet_count: retweets,
    tweet_count: tweets,
    total: score,
  };

  return {
    user,
    userScore,
  };
}
