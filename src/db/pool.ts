import pg from 'pg'

console.log(
  process.env.DATABASE_PORT as unknown as number,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  process.env.DATABASE_NAME ?? 'postgres'
)

export const pool = new pg.Pool({
  port: process.env.DATABASE_PORT as unknown as number,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME ?? 'postgres'
})
