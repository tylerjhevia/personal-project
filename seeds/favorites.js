exports.seed = (knex, Promise) => {
  return knex("favorites").del().then(promise => {
    return knex("favorites").insert([
      {
        title: "The Hobbit",
        author: "George R. R. Martin",
        google_id: "iqh48asdi5"
      },
      {
        title: "Game of Thrones",
        author: "J. R. R. Tolkien",
        google_id: "h3068233"
      }
    ]);
  });
};
