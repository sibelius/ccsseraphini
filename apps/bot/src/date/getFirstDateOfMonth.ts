export const getFirstDateOfMonth = (date: Date): Date => new Date(
  date.getFullYear(),
  date.getMonth(),
  1
);