export const getLastDayOfMonth = (date: Date): number => new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  0
).getDate();