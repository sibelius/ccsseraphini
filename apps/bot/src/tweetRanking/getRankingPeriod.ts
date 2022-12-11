import { getStartDate } from './getStartDate';
import { DateTime } from 'luxon';
import { RankingPeriod } from './types';

export const getRankingPeriod = (until: DateTime): RankingPeriod => {
  const since = getStartDate(until);

  if (!!since) {
    const endOfMonth = until.endOf('month').day;

    const label = until.day === endOfMonth ? 'monthly' : 'biweekly';

    return {
      label,
      since,
      until,
    };
  }

  if (until.weekday === 7) {
    return {
      label: 'weekly',
      since: until.minus({ days: 6 }),
      until,
    };
  }

  return {
    label: 'daily',
    since: until,
    until,
  };
};
