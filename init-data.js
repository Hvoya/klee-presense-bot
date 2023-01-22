require('dotenv').config()

const fs = require('fs')

const storageTemplete = {
  userById: {},
  usersIds: [],
  presenseById: {},
  presensesIds: []
}

fs.mkdirSync(process.env.STORAGE_PATH, { recursive: true })

fs.writeFileSync(`${process.env.STORAGE_PATH}/storage.json`, JSON.stringify(storageTemplete))

console.log('data was initialized')
