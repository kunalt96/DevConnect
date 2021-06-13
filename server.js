const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)

const io = socketio(server)
const { addUser, removeUser } = require('./utils/funcs')

// ConnectDB
connectDB()

app.use(express.json({ extended: false }))

io.on('connection', (socket) => {
  console.log(socket.id)
  socket.on('join', (id, cb) => {
    console.log('------------------------------------------------', id)
    const { error, userObj } = addUser(id, socket.id)
    console.log(error, userObj)
    if (error) return cb(error)
    cb()
  })
  socket.on('sendMessage', (message, callback) => {
    if (message) {
      console.log(message)
      console.log(io.sockets)
      // io.sockets.emit('message', 'You have one notification');
    }
    callback()
  })
  socket.on('disconnectit', (data) => {
    console.log(data)
    let { message } = removeUser(data.id)
    console.log('----', message)
    console.log('connection closed for', socket.id)
  })
})

app.use(function (req, res, next) {
  req.io = io
  next()
})

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/post', require('./routes/api/post'))
app.use('/api/admin', require('./routes/api/admin'))

// Serve static client assests in production
// if (process.env.NODE_ENV === 'production') {
app.use(express.static('client/build'))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})
// }

server.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`)
})
