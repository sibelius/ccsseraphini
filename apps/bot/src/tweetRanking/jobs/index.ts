import rankingJob from './rankingJob';
import syncRankedTweetJob from './syncRankedTweetJob';
import { config } from '../../config';
import { Settings } from 'luxon';

const startJobs = () => {
  if (!config.MONGO_URI) {
    console.warn('MONGO_URI is not defined');
    return;
  }

  Settings.defaultZone = 'America/Sao_Paulo';
  Settings.defaultLocale = 'pt-BR';

  rankingJob();
  syncRankedTweetJob();
};

export default startJobs;
