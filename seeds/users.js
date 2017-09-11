exports.seed = (knex, Promise) => {
  return knex("users").del().then(promise => {
    return knex("users").insert([
      { username: "tyler", email: "whaterver", password: "password" },
      { username: "tim tebow", email: "tim@tebow.com", password: "go gators" }
    ]);
  });
};
