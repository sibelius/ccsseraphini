import { getWeekStartDate } from '../date/getWeekStartDate';

export const getRankingWeeklyPeriod = (end: Date): Record<string, Date> => {
  const start: Date = getWeekStartDate(end);

  console.info(`Posting weekly ranking since ${start} until ${end}`);
  return { start, end };
};