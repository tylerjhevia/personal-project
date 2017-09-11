exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("favorites", function(table) {
      table.increments("id").primary();
      table.string("title");
      table.string("author");
      table.string("google_id");

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("favorites")]);
};
