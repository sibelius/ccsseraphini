import TemporaryTweetModel from './schema/TemporaryTweet';

const deleteTemporaryTweets = async (
  since: Date,
  until: Date = new Date(),
): Promise<void> => {
  try {
    await TemporaryTweetModel.deleteMany({
      created_at: { $gte: since, $lte: until },
    });
  } catch (error) {
    console.error('Fail to delete many tweets', error, {
      start: since,
      end: until,
    });
  }
};

export default deleteTemporaryTweets;
