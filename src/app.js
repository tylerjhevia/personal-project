"use strict";
exports.__esModule = true;
const express = require("express");
const http = require("http");
const app = express();
const bodyParser = require("body-parser");
const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

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
  const user = request.body;

  for (let requiredParameter of ["username", "email", "password"]) {
    if (!user[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { username: <String>, email: <String>, password: <String> }. You're missing a "${requiredParameter}" property.`
      });
    }
  }

  database("users")
    .insert({ username: "tyler", email: "tyler", password: "tyler" }, "id")
    .then(user => {
      response.status(201).json({ id: user[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});
