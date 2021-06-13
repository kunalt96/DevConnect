import io from 'socket.io-client'
let socket
const ENDPOINT = 'http://localhost:5000/'

const createConnection = (id) => {
  var connectionOptions = {
    'force new connection': true,
    reconnectionAttempts: 'Infinity',
    timeout: 10000,
    transports: ['websocket'],
  }
  console.log('IO CAL CALLED')
  socket = io(ENDPOINT, connectionOptions)
  console.log(socket)
  return socket.emit('join', { id }, (data) => {
    console.log(data)
    if (data == 'Please logout and login again') {
      console.log(data)
      return data
    } else {
      console.log('i am called')
      console.log(socket)
      return socket
    }
  })
}

// export default socket;

export default createConnection
