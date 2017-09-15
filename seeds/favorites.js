exports.seed = (knex, Promise) => {
  return knex("favorites").del().then(promise => {
    return knex("favorites").insert([
      {
        volumeInfo: {},
        book_id: "iqh48asdi5",
        user_id: 116
      },
      {
        volumeInfo: {},
        book_id: "h3068233",
        user_id: 116
      }
    ]);
  });
};
