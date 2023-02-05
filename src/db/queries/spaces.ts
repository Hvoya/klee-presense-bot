import { Space } from '../entities/Space'
import { pool } from '../pool'

export const getSpacesQuery = async (): Promise<Space[]> => {
  const result = await pool.query(
        `
        SELECT * from spaces
        `
  )

  return result.rows
}

export const getSpaceByUserQuery = async (user_id: string): Promise<Space> => {
  const result = await pool.query(
        `
        SELECT s.* from spaces s
        LEFT JOIN users u ON u.space_id = s.id
        GROUP BY u.id, s.id
        HAVING u.id = $1
        `,
        [user_id]
  )

  return result.rows[0]
}
