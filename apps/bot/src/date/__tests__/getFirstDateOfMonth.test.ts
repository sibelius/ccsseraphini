import { getFirstDateOfMonth } from "../getFirstDateOfMonth";

it('should return the first date of the current month', async () => {
  const date = new Date(2022, 1, 2, 19, 8, 0, 0);

  const lastDateOfMonth: Date = getFirstDateOfMonth(date);

  expect(lastDateOfMonth).toEqual(new Date(2022, 1, 1, 0, 0, 0, 0));
});