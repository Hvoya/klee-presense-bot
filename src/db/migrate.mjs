import Postgrator from 'postgrator'
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const migrate = async () => {
  const client = new pg.Client({
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME ?? 'postgres'
  })

  try {
    await client.connect()

    const postgrator = new Postgrator({
      migrationPattern: process.cwd() + '/src/db/migrations/*.sql',
      driver: 'pg',
      database: 'postgres',
      schemaTable: 'schemaversion',
      execQuery: async (query) => await client.query(query)
    })

    const appliedMigrations = await postgrator.migrate()

    await postgrator.migrate()

    console.log(appliedMigrations)
  } catch (error) {
    console.log(error)
  }

  await client.end()
}

migrate()
