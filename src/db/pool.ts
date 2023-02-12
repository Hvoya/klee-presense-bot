import pg from 'pg'

export const pool = new pg.Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT as unknown as number,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME ?? 'postgres'
})
