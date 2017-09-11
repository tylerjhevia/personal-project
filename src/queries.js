// const promise = require(express);

// var pgp = require("pg-promise")(options);
// var connectionString = "postgres://localhost:5432/profiles";
// var db = pgp(connectionString);

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);
const bookshelf = require("bookshelf")(database);

function login(req, res) {
  database("users")
    .where(req.body)
    .select("id", "username", "email", "password")
    .then(user => {
      if (user.length) {
        res.status(200).json({
          error: false,
          data: user
        });
      } else {
        res.status(404).json({
          error: true,
          data: { message: "invalid info" }
        });
      }
    })
    .catch(error => {
      response.status(500).json({
        error: true,
        data: { message: error.message }
      });
    });
}
