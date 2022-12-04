export const getDayBeforeDate = (date: Date): Date => new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate() - 1,
  23,
  59,
  59,
  999
);