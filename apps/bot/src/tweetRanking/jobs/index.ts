import { Settings } from 'luxon';

import { config } from '../../config';
import rankingJob from './rankingJob';
import syncRankedTweetJob from './syncRankedTweetJob';

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
