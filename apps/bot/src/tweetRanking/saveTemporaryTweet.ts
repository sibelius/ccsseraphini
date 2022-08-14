import { Tweet } from '../tweetTypes';
import { TemporaryTweet } from './types';
import TemporaryTweetModel from './schema/TemporaryTweet';

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
    console.error('Fail to save tweet', error, { tweet_id, created_at });
  }
};

export default saveTemporaryTweet;
