export const getRankingDailyPeriod = (until: Date) => {
  const start = new Date(until);
  const end = new Date(until);

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  console.info(`Posting daily ranking since ${start} until ${end}`);

  return { start, end };
};