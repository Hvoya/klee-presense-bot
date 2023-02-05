import { pool } from '../pool'

interface CreateWishQueryPayload {
  message: string
  user_id: string
}

export const createWishQuery = async (payload: CreateWishQueryPayload): Promise<void> => {
  await pool.query(
        `
        INSERT INTO wishes (message, user_id)
        VALUES ($1, $2)
        `,
        [payload.message, payload.user_id]
  )
}
