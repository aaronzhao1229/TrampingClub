const express = require('express')
const path = require('path')

const fruitRoutes = require('./routes/fruits')
const albumRoutes = require('./routes/albumRoutes')
const userRoutes = require('./routes/userRoutes')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/fruits', fruitRoutes)
server.use('/api/v1/album', albumRoutes)
server.use('/api/v1/users', userRoutes)

server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

module.exports = server
