import { getLastDayOfMonth } from "../getLastDayOfMonth";

it.each([
  { date: new Date(2020, 0, 1), expected: 31 },
  { date: new Date(2020, 1, 1), expected: 29 },
  { date: new Date(2021, 1, 1), expected: 28 },
  { date: new Date(2020, 3, 1), expected: 30 },
  { date: new Date(2020, 4, 1), expected: 31 },

])('should return the last day of the current month', async ({ date, expected }: { date: Date, expected: number }) => {
  const lastDayOfMonth = getLastDayOfMonth(date);

  expect(lastDayOfMonth).toBe(expected);
});