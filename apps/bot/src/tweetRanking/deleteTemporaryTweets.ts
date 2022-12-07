import { DateTime } from 'luxon';
import TemporaryTweetModel from './schema/TemporaryTweet';

const deleteTemporaryTweets = async (
  startDate: DateTime,
  endDate: DateTime = DateTime.now(),
): Promise<void> => {
  const since = startDate.toJSDate();
  const until = endDate.toJSDate();
  try {
    await TemporaryTweetModel.deleteMany({
      created_at: { $gte: since, $lte: until },
    });
  } catch (error) {
    console.error('Fail to delete many tweets', error, {
      startDate,
      endDate,
    });
  }
};

export default deleteTemporaryTweets;
