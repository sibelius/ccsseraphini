import RankedTweetModel from './schema/RankedTweet';

const deleteRankedTweetsById = async (tweetIds: string[]): Promise<void> => {
  try {
    await RankedTweetModel.deleteMany({ tweet_id: { $in: tweetIds } });
  } catch (error) {
    console.error('Fail to delete ranked tweets', error, { tweetIds });
  }
};

export default deleteRankedTweetsById;
