"use strict";
exports.__esModule = true;
const express = require("express");
const http = require("http");
const app = express();
const bodyParser = require("body-parser");

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
