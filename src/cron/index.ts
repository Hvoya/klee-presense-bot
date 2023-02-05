import { fillPresensesForYearJob } from './fill-presenses-for-next-year'

export const initCronJobs = (): void => {
  fillPresensesForYearJob.start()
}
