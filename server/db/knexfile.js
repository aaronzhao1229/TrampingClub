const path = require('path')

module.exports = {
  development: {
    client: 'mysql2',
    // connection: {
    //   host: 'localhost',
    //   user: 'root',
    //   password: 'test1234!',
    //   database: 'test',
    // },
    connection: {
      host: 'localhost',
      user: 'aaronlaptop',
      password: 'Lj090418!',
      database: 'lambdaDB',
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'test1234!',
      database: 'unittest',
    },
    useNullAsDefault: true,
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
  },

  // to be updated
  production: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
    pool: {
      min: 2,
      max: 10,
    },
    useNullAsDefault: true,
  },
}
