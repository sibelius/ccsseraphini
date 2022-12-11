import { User } from 'types/User';
import { config } from 'config';
import { userTweets } from 'modules/twitter/twitterFollowersGet';
import { userProfile } from 'modules/twitter/twitterUserGet';
import { UserScore } from 'types/Score';
import { getElegibleTweets } from './getElegibleTweets';
import { getEmptyScore } from './getEmptyScore';
import { calculateUserScore } from './calculateUserScore';

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

  if (!tweets) {
    return Promise.resolve({
      user,
      userScore: getEmptyScore(),
    });
  }

  const elegibleTweets = getElegibleTweets({
    tweets,
    twitter_profile_id,
    twitter_profile_user,
  });
  const userScore = calculateUserScore(elegibleTweets);

  return {
    user,
    userScore,
  };
}
