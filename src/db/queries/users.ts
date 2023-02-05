import { User } from '../entities/User'
import { pool } from '../pool'
import { fillUserPresensesTillEndOfYear } from './presenses'

export const getUserQuery = async (id: string): Promise<User> => {
  const result = await pool.query(
        `
        SELECT * FROM users u
        WHERE u.id = $1
        `,
        [id]
  )

  return result.rows[0]
}

interface CreateUserPayload {
  id: number
  username?: string
  last_name?: string
  first_name?: string
  space_id: number
}

export const createUserQuery = async (paylaod: CreateUserPayload): Promise<void> => {
  const result = await pool.query(
        `
        INSERT INTO users (id, username, first_name, last_name, space_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
        [paylaod.id, paylaod.username, paylaod.first_name, paylaod.last_name, paylaod.space_id]
  )

  const createdUser = result.rows[0] as User

  await fillUserPresensesTillEndOfYear(createdUser)
}
