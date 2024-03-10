const express = require('express')
const registerRouter = require('./backend/router.js')


async function createServer(){
  const app = express()
  registerRouter(app)
  app.listen(3000, function() {
    console.log('Listening at http://localhost:3000' + '\n')
  })
}
createServer()