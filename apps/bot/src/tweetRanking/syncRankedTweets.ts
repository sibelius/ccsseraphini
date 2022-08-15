import { JobCallback } from 'node-schedule';

import { RankedTweet } from './types';
import saveRankedTweets from './saveRankedTweets';
import deleteRankedTweetsById from './deleteRankedTweetsById';
import getRankedTweetsFromApi from './getRankedTweetsFromApi';
import isPublicMetricsChanged from './isPublicMetricsChanged';
import findRankedTweetsForSync from './findRankedTweetsForSync';

const syncRankedTweets: JobCallback = async (): Promise<void> => {
  try {
    const currentRankedTweets: RankedTweet[] = await findRankedTweetsForSync();

    if (!currentRankedTweets.length) {
      console.info('No ranked tweets found in database');
      return;
    }

    const rankedTweetsToSync: RankedTweet[] = await getRankedTweetsFromApi(
      currentRankedTweets,
    );

    if (!rankedTweetsToSync.length) {
      console.error('No tweets found in Twitter API');
      return;
    }

    const tweetsMap: Record<string, RankedTweet> = currentRankedTweets.reduce(
      (acc, rankedTweet) => {
        const { tweet_id } = rankedTweet;
        acc[tweet_id] = rankedTweet;
        return acc;
      },
      {},
    );

    const newRankedTweets: RankedTweet[] = rankedTweetsToSync.map(
      (rankedTweet: RankedTweet) => {
        const { tweet_id } = rankedTweet;
        const { public_metrics: currentMetrics }: RankedTweet =
          tweetsMap[tweet_id];
        const { public_metrics: newMetrics }: RankedTweet = rankedTweet;

        rankedTweet.changes_since_last_update = isPublicMetricsChanged(
          currentMetrics,
          newMetrics,
        );
        rankedTweet.last_updated = new Date();

        delete tweetsMap[rankedTweet.tweet_id];

        return rankedTweet;
      },
    );

    await saveRankedTweets(newRankedTweets);
    console.info(`Updated ${newRankedTweets.length} ranked tweets`);

    const deleteTweetIds = Object.keys(tweetsMap);
    if (deleteTweetIds.length > 0) {
      await deleteRankedTweetsById(deleteTweetIds);
      console.info(`Deleted ${deleteTweetIds.length} ranked tweets`);
    }
  } catch (error) {
    console.error('Fail to sync ranked tweets', error);
  }
};

export default syncRankedTweets;
