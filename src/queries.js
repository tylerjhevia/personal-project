const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);
const bookshelf = require("bookshelf")(database);

function login(req, res) {
  database("users")
    .one(
      "select * from users where username=${username} and password=${password}",
      req.body
    )
    .then(user => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ONE User"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

module.exports = {
  login: login
};
