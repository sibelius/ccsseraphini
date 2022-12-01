import { getStartDateFunctionMap } from './getStartDateFunctionMap';
import { getRankingMonthlyOrBiweeklyPeriod } from './getRankingMonthlyOrBiweeklyPeriod';
import { getRankingWeeklyPeriod } from './getRankingWeeklyPeriod';
import { getRankingDailyPeriod } from './getRankingDailyPeriod';

const isSunday = (date: Date): boolean => date.getDay() === 0;

export const getRankingPeriod = (until: Date): Record<string, Date> => {
  const startDateFunctionMap: Record<number, Function> = getStartDateFunctionMap(until);
  const untilDateOfMonth: number = until.getDate();
  const getStartDate: Function = startDateFunctionMap[untilDateOfMonth];

  if (!!getStartDate)
    return getRankingMonthlyOrBiweeklyPeriod(getStartDate, until, startDateFunctionMap, untilDateOfMonth);

  if (isSunday(until))
    return getRankingWeeklyPeriod(until);

  return getRankingDailyPeriod(until);
};