import { getElegibleTweets } from './getElegibleTweets';
import { userTweets } from 'modules/twitter/twitterFollowersGet';

jest.mock('modules/twitter/twitterUserGet');
jest.mock('modules/twitter/twitterFollowersGet');

describe('GetElegibleTweets', () => {
  test('Should return only one elegible tweet', async () => {
    const { data: tweets } = await userTweets(
      '1070750548608147456',
      'accessToken',
    ).then((data) => data);
    const result = getElegibleTweets({
      tweets,
      twitter_profile_id: '2313873457',
      twitter_profile_user: 'sseraphini',
    });

    expect(result.length).toBe(1);
  });
});
