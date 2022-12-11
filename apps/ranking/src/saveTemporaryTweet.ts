import { Tweet } from './types/index';
import { TemporaryTweet } from './types/index';
import { TemporaryTweetModel } from './schema/TemporaryTweet';

type SavedTweet = {
  created_at: Date;
  tweet_id: string;
  _id: any;
};

const saveTemporaryTweet = async ({
  data: { id: tweet_id, created_at },
}: Tweet): Promise<SavedTweet | void> => {
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
