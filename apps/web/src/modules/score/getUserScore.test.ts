import { getUserScore } from './getUserScore';
import { config } from 'config';

jest.mock('modules/twitter/twitterUserGet');
jest.mock('modules/twitter/twitterFollowersGet');
jest.mock('./getRankingScore', () => ({
  getRankingScore: jest.fn().mockResolvedValue({
    score: 2,
    tweets: 1,
    likes: 1,
    retweets: 0,
    replies: 0,
    quotes: 0,
  }),
}));

describe('GetUserScore', () => {
  const filledVariable = {
    value: '2313873457',
    configurable: true,
    writable: true,
  };

  const emptyVariable = {
    value: '',
    configurable: true,
    writable: true,
  };

  test('Should return http status 401 when TWITTER_BEARER_TOKEN is not configured', async () => {
    const result = await getUserScore('pjonatansr').catch((error) => error);

    expect(result.statusCode).toEqual(401);
  });

  test('Should return http status 500 when TWITTER_PROFILE_ID is not configured', async () => {
    Object.defineProperties(config, {
      TWITTER_BEARER_TOKEN: filledVariable,
      TWITTER_PROFILE_ID: emptyVariable,
      TWITTER_PROFILE_USER: filledVariable,
    });

    const result = await getUserScore('pjonatansr').catch((error) => error);

    expect(result.message).toEqual('Twitter profile id is not set');
    expect(result.statusCode).toEqual(500);
  });

  test('Should return http status 500 when TWITTER_PROFILE_USER is not configured', async () => {
    Object.defineProperties(config, {
      TWITTER_BEARER_TOKEN: filledVariable,
      TWITTER_PROFILE_ID: filledVariable,
      TWITTER_PROFILE_USER: emptyVariable,
    });

    const result = await getUserScore('pjonatansr').catch((error) => error);

    expect(result.message).toEqual('Twitter profile user is not set');
    expect(result.statusCode).toEqual(500);
  });

  test('Should not return empty score when user have tweets', async () => {
    Object.defineProperties(config, {
      TWITTER_BEARER_TOKEN: filledVariable,
      TWITTER_PROFILE_ID: filledVariable,
      TWITTER_PROFILE_USER: filledVariable,
    });
    const { userScore } = await getUserScore('pjonatansr').then((data) => data);

    expect(userScore).toEqual({
      retweet_count: 0,
      reply_count: 0,
      like_count: 1,
      quote_count: 0,
      tweet_count: 1,
      total: 2,
    });
  });

  test('Should return 404 when user not exists', async () => {
    Object.defineProperties(config, {
      TWITTER_BEARER_TOKEN: filledVariable,
      TWITTER_PROFILE_ID: filledVariable,
      TWITTER_PROFILE_USER: filledVariable,
    });

    const { statusCode } = await getUserScore('pjon#at@ansr').catch(
      (error) => error,
    );

    expect(statusCode).toEqual(404);
  });
});
