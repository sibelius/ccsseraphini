import TemporaryTweetModel from './schema/TemporaryTweet';

const deleteTemporaryTweets = async (
  start: Date,
  end: Date = new Date(),
): Promise<void> => {
  try {
    await TemporaryTweetModel.deleteMany({
      created_at: { $gte: start, $lte: end },
    });
  } catch (error) {
    console.error('Fail to delete many tweets', error, { start, end });
  }
};

export default deleteTemporaryTweets;
