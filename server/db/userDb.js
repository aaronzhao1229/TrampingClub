const connection = require('./connection')

function getUser(db = connection) {
    return db('user').select()
}

module.exports = {
    getUser,
}