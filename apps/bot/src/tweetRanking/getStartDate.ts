import { DateTime } from 'luxon';
import { StartDateFunction, GetRelativeDates } from './types';

const getRelativeDates: GetRelativeDates = (date) => {
  const endOfMonth = date.endOf('month').day;

  const lastBiweeklyDay = endOfMonth - 1;

  const firstBiweeklyDay = Math.floor(lastBiweeklyDay / 2);

  return {
    firstBiweeklyDay,
    endOfMonth,
    lastBiweeklyDay,
  };
};

export const getStartDateFunctionMap = (
  date: DateTime,
): Record<number, StartDateFunction> => {
  const { firstBiweeklyDay, lastBiweeklyDay, endOfMonth } =
    getRelativeDates(date);

  const getStartOfMonth: StartDateFunction = (endDate) =>
    endDate.startOf('month');

  const getStartOfSecondBiweekly: StartDateFunction = (endDate) =>
    endDate.set({ day: firstBiweeklyDay + 1 });

  return {
    [endOfMonth]: getStartOfMonth,
    [firstBiweeklyDay]: getStartOfMonth,
    [lastBiweeklyDay]: getStartOfSecondBiweekly,
  };
};

export const getStartDate: StartDateFunction = (date) => {
  const startDateFunctionMap = getStartDateFunctionMap(date);
  const { day } = date;
  const getStartDateFunction = startDateFunctionMap[day];

  if (!!getStartDateFunction) return getStartDateFunction(date)?.startOf('day');
};
