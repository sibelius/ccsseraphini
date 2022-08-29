import rankingJob from './rankingJob';
import syncRankedTweetJob from './syncRankedTweetJob';
import { config } from '../../config';

const startJobs = () => {
  if (!config.MONGO_URI) {
    console.warn('MONGO_URI is not defined');
    return;
  }

  rankingJob();
  syncRankedTweetJob();
};

export default startJobs;
