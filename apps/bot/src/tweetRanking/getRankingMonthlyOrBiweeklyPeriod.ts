const getPeriodLabel = (startDateMap: Record<number, Function>, untilDateOfMonth: number) => {
  const startDateKeys: number[] = Object
    .keys(startDateMap)
    .map(Number);

  const isMonthlyRanking = Math
    .max(...startDateKeys) === untilDateOfMonth;

  return isMonthlyRanking
    ? 'monthly'
    : 'biweekly';
}

export const getRankingMonthlyOrBiweeklyPeriod = (getStartDate: Function, until: Date, startDateMap: Record<number, Function>, untilDateOfMonth: number): Record<string, Date> => {
  const since = getStartDate(until);
  const periodLabel = getPeriodLabel(startDateMap, untilDateOfMonth);

  console.info(`Posting ${periodLabel} (${untilDateOfMonth}) ranking since ${since} until ${until}, running at ${new Date()}`);
  return { start: since, end: until };
};