/* eslint-disable import/first */
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

import { initAdmin } from './admin/init'
import { initCronJobs } from './cron'
import { launchBot } from './bot'

const start = async (): Promise<void> => {
  try {
    const app = express()

    await initAdmin(app)
    launchBot()
    initCronJobs()

    app.listen(process.env.SERVER_PORT)
  } catch (e) {
    console.log(e)
  }
}

void start()
