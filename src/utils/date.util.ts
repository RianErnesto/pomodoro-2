export const getDateDiffInSeconds = (fromDate: Date, toDate: Date): number => {
  return Math.floor((fromDate.getTime() - toDate.getTime()) / 1000);
};

export const sumMinutesToDate = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60000);
};
