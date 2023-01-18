const fs = require('fs')

if (!fs.existsSync('data/storage.json')) {
  if (!fs.existsSync('data')) {
    fs.mkdirSync('data')
  }

  fs.copyFileSync('storage.example.json', 'data/storage.json')

  console.log('data was initialized')
}
