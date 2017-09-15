exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("favorites", function(table) {
      table.increments("id").primary();
      table.json("volumeInfo");
      table.string("book_id");
      table.integer("user_id");

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("favorites")]);
};
