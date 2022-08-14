import { Tweet, Public_metrics } from '../../tweetTypes';
import TemporaryTweetModel from '../schema/TemporaryTweet';
import { TemporaryTweet, TweetData } from '../types';

export const createFakeTweets = (): TemporaryTweet[] => {
  const fakeTweetIds = [
    '1160323737035677698',
    '1260323737035677698',
    '1360323737035677698',
    '1460323737035677698',
    '1560323737035677698',
    '1660323737035677698',
    '1760323737035677698',
    '1860323737035677698',
    '1960323737035677698',
    '2060323737035677698',
  ];

  return fakeTweetIds.map((id) => {
    const model = new TemporaryTweetModel({
      tweet_id: id,
      created_at: '2021-11-15T19:08:05.000Z',
    });

    return model;
  });
};
