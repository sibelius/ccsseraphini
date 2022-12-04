import { getFirstDateOfMonth } from '../date/getFirstDateOfMonth';
import { getLastDayOfMonth } from '../date/getLastDayOfMonth';

export const getStartDateFunctionMap = (date: Date): Record<number, Function> => {
  const lastDay = getLastDayOfMonth(date);
  const lastBiweeklyDay = lastDay - 1;
  const firstBiweeklyDay = Math.floor(lastBiweeklyDay / 2);

  const startDateFunctionMap: Record<number, Function> = {
    [lastDay]: (date: Date): Date => getFirstDateOfMonth(date),
    [firstBiweeklyDay]: (date: Date) => getFirstDateOfMonth(date),
    [lastBiweeklyDay]: (date: Date) => new Date(date.getFullYear(), date.getMonth(), firstBiweeklyDay + 1),
  };

  return startDateFunctionMap;
};