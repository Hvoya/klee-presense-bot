import cron from 'cron'
import { pool } from '../db/pool'
import { fillUserPresensesTillEndOfYear } from '../db/queries/presenses'

/**
 * Создает presenses на год вперед 1 января в полночь
 */
export const fillPresensesForYearJob = new cron.CronJob(
  '0 0 1 1 *',
  async (): Promise<void> => {
    const users = (await pool.query('SELECT * from users')).rows

    users.forEach(fillUserPresensesTillEndOfYear)
  },
  null,
  false
)
