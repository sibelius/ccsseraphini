import TemporaryTweetModel from '../schema/TemporaryTweet';
import { TemporaryTweet } from '../types';

const createFakeTemporaryTweets = (created_at: Date): TemporaryTweet[] => {
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
      created_at,
    });

    return model;
  });
};

export default createFakeTemporaryTweets;
