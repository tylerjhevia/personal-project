exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", function(table) {
      table.increments("user_id").primary();
      table.string("username");
      table.string("email");
      table.string("password");

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("users"),
    knex.schema.dropTable("favorites")
  ]);
};
