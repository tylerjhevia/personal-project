exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex("users").del().then(promise => {
    return knex("users").insert([
      { username: "tyler", email: "whaterver", password: "password" }
    ]);
  });
};
