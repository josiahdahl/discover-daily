exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('spotify_id').unique();
    table.string('display_name').nullable();
    table.string('email').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
