import TweetModel from './Tweet';
import { Tweet } from '../tweetTypes';
import { TweetDocument } from './types';

const saveTweetData = async ({
  data: { id: tweet_id, created_at },
}: Tweet): Promise<TweetDocument> => {
  try {
    const tweetModel = new TweetModel({
      data: {
        tweet_id,
        created_at,
      },
    });

    const tweetSaved = await tweetModel.save();

    return tweetSaved;
  } catch (error) {
    console.error('Fail to save tweet', error);
  }
};

export default saveTweetData;
