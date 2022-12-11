import { DateTime } from 'luxon';
import { getStartDateFunctionMap } from '../getStartDate';

it.each([
  {
    name: 'February 2022',
    date: new Date(2022, 1, 2, 19, 8, 0, 0),
    expected: {
      13: expect.any(Function),
      27: expect.any(Function),
      28: expect.any(Function),
    },
  },
  {
    name: 'June 2022',
    date: new Date(2022, 5, 2, 19, 8, 0, 0),
    expected: {
      14: expect.any(Function),
      29: expect.any(Function),
      30: expect.any(Function),
    },
  },
  {
    name: 'August 2022',
    date: new Date(2022, 7, 2, 19, 8, 0, 0),
    expected: {
      15: expect.any(Function),
      30: expect.any(Function),
      31: expect.any(Function),
    },
  },
  {
    name: 'February 2020',
    date: new Date(2020, 1, 2, 19, 8, 0, 0),
    expected: {
      14: expect.any(Function),
      28: expect.any(Function),
      29: expect.any(Function),
    },
  },
])(
  'testing dates',
  async ({
    date,
    expected,
  }: {
    date: Date;
    expected: Record<number, Function>;
  }) => {
    const endDate = DateTime.fromJSDate(date);
    const startDateFunctionMap = getStartDateFunctionMap(endDate);

    expect(startDateFunctionMap).toEqual(expected);
  },
);
