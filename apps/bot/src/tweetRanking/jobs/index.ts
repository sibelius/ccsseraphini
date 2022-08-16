import rankingJob from './rankingJob';
import syncRankedTweetJob from './syncRankedTweetJob';

const startJobs = () => {
  rankingJob();
  syncRankedTweetJob();
};

export default startJobs;
