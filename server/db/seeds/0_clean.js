exports.seed = async (knex) => {
  await knex('photos').del()
  await knex('album').del()
  await knex('fruit').del()
}