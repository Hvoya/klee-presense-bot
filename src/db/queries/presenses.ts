import { addDays, differenceInDays, endOfYear, getDay, startOfDay } from 'date-fns'
import pgformat from 'pg-format'

import { DayOfWeek, getToday } from '../../utils/date'
import { DateNode } from '../entities/DateNode'
import { Presense, PresenseStatus } from '../entities/Presense'
import { User } from '../entities/User'
import { pool } from '../pool'

interface GetPresensePayload {
  date: Date
  user_id: number
}

export const getPresenseQuery = async (payload: GetPresensePayload): Promise<Presense> => {
  const result = await pool.query(
        `
        SELECT 
            p.*, 
            row_to_json(u) as user
        FROM presenses p
        LEFT JOIN users u ON u.id = p.user_id
        WHERE p.date = $1 AND u.id = $2
        `,
        [payload.date, payload.user_id]
  )

  return result.rows[0]
}

interface UpdatePresensePayload {
  date: Date
  status: PresenseStatus
  user_id: string
}

export const updatePresenseQuery = async (payload: UpdatePresensePayload): Promise<void> => {
  await pool.query(
        `
        UPDATE presenses
        SET status = $1
        WHERE user_id = $2 AND date = $3
        `,
        [payload.status, payload.user_id, payload.date]
  )
}

export const fillUserPresensesTillEndOfYear = async (user: User): Promise<void> => {
  const dateToStart = getToday()
  const dateToEnd = startOfDay(endOfYear(new Date()))

  const diff = differenceInDays(dateToEnd, dateToStart)

  const presenses = new Array(diff).fill('not-empty').map((_, idx) => {
    const date = addDays(dateToStart, idx)

    if ([DayOfWeek.Saturday, DayOfWeek.Sunday].includes(getDay(date))) {
      return null
    }

    return {
      status: 'unknown',
      user_id: user.id,
      date
    }
  })
    .filter(Boolean)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map(presense => [presense!.user_id, presense!.status, presense!.date])

  await pool.query(
    pgformat('INSERT INTO presenses (user_id, status, date) VALUES %L ON CONFLICT DO NOTHING', presenses)
  )
}

interface GetDatesWithUserPresensePayload {
  start_date: Date
  amount: number
  space_id: number
}

export const getDatesWithUserPresenseQuery = async (payload: GetDatesWithUserPresensePayload): Promise<DateNode[]> => {
  const result = await pool.query(
        `
            SELECT 
                d.date,
                json_agg(
                    json_build_object(
                        'presense_status', p.status,
                        'username', u.username,
                        'first_name', u.first_name,
                        'last_name', u.last_name,
                        'id', u.id
                    )
                ) as users
            FROM (
                SELECT  CAST($1 AS TIMESTAMP WITH TIME ZONE) + (n || ' day')::INTERVAL as date
                FROM    generate_series(0, $2) n
            ) d
            LEFT JOIN presenses p ON p.date = d.date
            LEFT JOIN users u ON u.id = p.user_id
            LEFT JOIN spaces s ON s.id = u.space_id
            WHERE s.id = $3
            GROUP BY d.date
        `,
        [payload.start_date, payload.amount - 1, payload.space_id]
  )

  return result.rows
}
