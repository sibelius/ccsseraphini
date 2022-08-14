import { Tweet } from '../tweetTypes';
import TemporaryTweetModel from './schema/TemporaryTweet';
import { TemporaryTweet } from './types';

const saveTemporaryTweet = async ({
  data: { id: tweet_id, created_at },
}: Tweet): Promise<TemporaryTweet> => {
  try {
    const tweetModel = new TemporaryTweetModel({
      tweet_id,
      created_at,
    });

    const tweetSaved = await tweetModel.save();

    return tweetSaved;
  } catch (error) {
    console.error('Fail to save tweet', error);
  }
};

export default saveTemporaryTweet;
