import { addDays, getDay, startOfDay, startOfWeek } from 'date-fns'

export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export const getToday = (): Date => startOfDay(new Date())

export const getTomorrow = (): Date => startOfDay(addDays(new Date(), 1))

export const getStartOfWeek = (): Date => startOfWeek(new Date())

export const getNextDayOfWeek = (day: number): Date => {
  let date = startOfDay(new Date())

  while (getDay(date) !== day) {
    date = addDays(date, 1)
  }

  return date
}
