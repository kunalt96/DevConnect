let onlineUsers = []
const addUser = (id, socketId) => {
  let userObj = { id: id.id, socketId: socketId }
  const findUser = onlineUsers.find((value) => value.id == id.id)
  if (findUser) {
    return { error: 'Please logout and login again' }
  } else {
    onlineUsers.push(userObj)
    console.log('in here', onlineUsers)
    return { userObj }
  }
}

const removeUser = (id) => {
  let findIndexOfUser = onlineUsers.findIndex((value) => (value.id = id))
  onlineUsers.splice(findIndexOfUser, 1)
  console.log('DELETION IS HERE', onlineUsers)
  return { message: 'Deletion successfull' }
}

module.exports = { addUser, removeUser }
