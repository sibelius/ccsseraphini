import { getWeekStartDate } from "../getWeekStartDate";

it('should return last monday', async () => {
  const date = new Date(2022, 11, 4, 0, 0, 0, 0);

  const lastDateOfMonth: Date = getWeekStartDate(date);

  expect(lastDateOfMonth).toEqual(new Date(2022, 10, 28, 0, 0, 0, 0));
});