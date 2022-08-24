import createPostFromRankedTweets from './createPostFromRankedTweets';

const isSunday = (date: Date): boolean => date.getDay() === 0;
const getFirstDateOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);
const getLastDayOfMonth = (month: number, year: number): number =>
  new Date(year, month, 0).getDate();
const getYesterday = (date: Date): Date => {
  const newDate: Date = new Date(date.setHours(23, 59, 59, 999));
  return new Date(newDate.valueOf() - 1000 * 60 * 60 * 24);
};
const getSinceResolverByDate = (date: Date): Record<number, Function> => {
  const lastDay = getLastDayOfMonth(date.getMonth(), date.getFullYear());
  const lastBiweeklyDay = lastDay - 1;
  const firstBiweeklyDay = Math.floor(lastBiweeklyDay / 2);
  const sinceByDateMap: Record<number, Function> = {
    [lastDay]: (date: Date): Date => getFirstDateOfMonth(date),
    [firstBiweeklyDay]: (date: Date) => getFirstDateOfMonth(date),
    [lastBiweeklyDay]: (date: Date) =>
      new Date(date.getFullYear(), date.getMonth(), firstBiweeklyDay + 1),
  };

  return sinceByDateMap;
};

const postTweetRanking = async (date: Date): Promise<void> => {
  const yesterday: Date = getYesterday(date);
  const sinceByDateMap: Record<number, Function> =
    getSinceResolverByDate(yesterday);
  const yesterdayDate: number = yesterday.getDate();
  const getSince: Function = sinceByDateMap[yesterdayDate];

  //Monthly or biweekly ranking
  if (!!getSince) {
    const since = getSince(yesterday);
    await createPostFromRankedTweets(since, yesterday);
    return;
  }

  //Weekly ranking
  if (isSunday(yesterday)) {
    const lastMonday: Date = new Date(
      yesterday.valueOf() - 1000 * 60 * 60 * 24 * 6,
    );
    await createPostFromRankedTweets(lastMonday, yesterday);
    return;
  }

  //Daily ranking
  const yesterdayMidnight: Date = new Date(yesterday.setHours(0, 0, 0, 0));
  await createPostFromRankedTweets(yesterdayMidnight, yesterday);
};

export default postTweetRanking;
