/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      auth0_id: 'abcd',
      name: 'sam white',
      username: 'sam123',
      email: 'sam@gmail.com',
      role: 'admin',
    },
    {
      id: 2,
      auth0_id: 'a3cd',
      name: 'luna luna',
      username: 'luna123',
      email: 'luna@gmail.com',
      role: 'low',
    },
  ])
}
