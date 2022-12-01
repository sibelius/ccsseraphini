export const getWeekStartDate = (date: Date): Date => new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate() - 6,
  0,
  0,
  0,
  0
);