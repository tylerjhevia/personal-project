// "use strict";
// exports.__esModule = true;
const path = require("path");
const cors = require("express-cors");
const express = require("express");
const http = require("http");
const app = express();
const bodyParser = require("body-parser");
const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);
const users = require("../routes/users");

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", users);

app.set("port", process.env.PORT || 3000);

app.get("/", function(req, res) {
  res.send("test!");
});

app.set("port", process.env.PORT || 3000);
app.get("/whatup", function(req, res) {
  res.send("whatup");
});

http.createServer(app).listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});

// USERS

app.get("/api/v1/users", (request, response) => {
  database("users")
    .select()
    .then(users => {
      response.status(200).json(users);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post("/api/v1/users", (request, response) => {
  database("users")
    .where({
      username: request.body.username,
      password: request.body.password
    })
    .select()
    .then(users => {
      response.status(200).json(users);
    })
    .catch(error => {
      response.status(500).json({ error });
    });

  // for (let requiredParameter of ["username", "email", "password"]) {
  //   if (!user[requiredParameter]) {
  //     return response.status(422).send({
  //       error: `Expected format: { username: <String>, email: <String>, password: <String> }. You're missing a "${requiredParameter}" property.`
  //     });
  //   }
  // }
});

app.post("/api/v1/users/new", (request, response) => {
  database("users")
    .where({
      username: request.body.username,
      email: request.body.email
    })
    .insert(
      {
        username: request.body.username,
        email: request.body.email,
        password: request.body.password
      },
      "id"
    )
    .then(user => {
      response.status(201).json({ id: user[0], cool: "yay" });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// FAVORITES

// app.get("/api/v1/favorites", (request, response) => {
//   database("favorites")
//     .select()
//     .then(favorites => {
//       response.status(200).json(favorites);
//     })
//     .catch(error => {
//       response.status(500).json({ error });
//     });
// });

// app.post("/api/v1/favorites", (request, response) => {
//   const favorite = request.body;

//   for (let requiredParameter of ["title", "author", "google_id"]) {
//     if (!favorite[requiredParameter]) {
//       return response.status(422).send({
//         error: `Expected format: { title: <String>, author: <String>, google_id: <String> }. You're missing a "${requiredParameter}" property.`
//       });
//     }
//   }

//   database("favorites")
//     .insert({ title: "tyler", author: "tyler", google_id: "tyler" }, "id")
//     .then(favorite => {
//       response.status(201).json({ id: favorite[0] });
//     })
//     .catch(error => {
//       response.status(500).json({ error });
//     });
// });

module.exports = app;
