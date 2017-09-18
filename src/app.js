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
const favorites = require;

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
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
      username: request.body.username
    })
    .select()
    .then(users => {
      response.status(200).json(users);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// user submits username
// get /users{username}
// if response { user exists, display error }
// catch { user doesn't exist, proceed with add user logic}

app.post("/api/v1/users/new", (request, response) => {
  database("users")
    .insert(
      {
        username: request.body.username,
        email: request.body.email,
        password: request.body.password
      },
      "id"
    )
    .then(users => response.status(201).json(users))
    .catch(error => {
      response.status(500).json({ error });
    });
});

// FAVORITES

app.get("/api/v1/favorites", (request, response) => {
  database("favorites")
    .select()
    .then(favorites => {
      response.status(200).json(favorites);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post("/api/v1/favorites", (request, response) => {
  database("favorites")
    .where({ user_id: request.body.user_id })
    .select()
    .then(favorites => {
      response.status(200).json(favorites);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post("/api/v1/favorites/new", (request, response) => {
  database("favorites")
    .where({
      book_id: request.body.id,
      volumeInfo: request.body.volumeInfo,
      user_id: request.user_id
    })
    .insert(
      {
        book_id: request.body.id,
        volumeInfo: request.body.volumeInfo,
        user_id: request.body.user_id
      },
      "id"
    )
    .then(res => response.status(201).json(res))
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete("/api/v1/favorites/delete", (request, response) => {
  database("favorites")
    .where({
      user_id: request.body.user_id,
      book_id: request.body.book_id
    })
    .delete()
    .then(res => res.json(res))
    .catch(error => error);
});

module.exports = app;
