const connection = require('./connection')

function userExists(username, db = connection) {
  return db('users')
    .where('username', username)
    .then((usersFound) => !!usersFound.length)
}

async function getUser(id, db = connection) {
  try {
    const user = await db('users')
      .select('name', 'username', 'email', 'role')
      .where('auth0_id', id)
      //not sure if we need id and auth0_id? or how to use both correctly
      .first()
    if (!user) {
      throw new Error('User not found')
    }
    return user
  } catch (error) {
    console.error(error)
  }
}

async function createUser(user, db = connection) {
  try {
    const result = await db('users').insert(user)
    return result
  } catch (error) {
    console.error('Error while creating user', error)
    throw new Error('Failed to create user')
  }
}

module.exports = {
  getUser,
  userExists,
  createUser,
}
