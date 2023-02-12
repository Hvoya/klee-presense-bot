import { Adapter, Resource, Database } from '@adminjs/sql'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Express } from 'express'

const authenticate = (email: string, password: string): boolean | null => {
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return true
  }
  return null
}

export const initAdmin = async (app: Express): Promise<void> => {
  AdminJS.registerAdapter({
    Database,
    Resource
  })

  const db = await new Adapter('postgresql', {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT as unknown as number,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME ?? 'postgres'
  }).init()

  const admin = new AdminJS({
    resources: [
      {
        resource: db.table('spaces'),
        options: {}
      },
      {
        resource: db.table('users'),
        options: {
          properties: {
            id: {
              isVisible: {
                edit: true,
                show: true,
                list: false,
                filter: false
              }
            }
          }
        }
      },
      {
        resource: db.table('presenses'),
        options: {
          properties: {
            date: {
              isVisible: {
                edit: true,
                show: true,
                list: true,
                filter: false
              }
            }
          }
        }
      },
      {
        resource: db.table('wishes'),
        options: {}
      }
    ]
  })

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: 'sessionsecret'
  })

  app.use(admin.options.rootPath, adminRouter)
}
