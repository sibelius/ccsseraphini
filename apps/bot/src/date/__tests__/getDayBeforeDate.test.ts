import { getDayBeforeDate } from "../getDayBeforeDate";

it('should return day before date and hour 23:59:59:999', async () => {
  const until = new Date(2022, 1, 2, 19, 8, 0, 0);
  const dayBeforeUntil = getDayBeforeDate(until);
  const expected = new Date(2022, 1, 1, 23, 59, 59, 999);

  expect(dayBeforeUntil.toISOString()).toBe(expected.toISOString());
});