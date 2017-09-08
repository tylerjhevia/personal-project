"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var app = express();
app.set("port", process.env.PORT || 3000);
app.get("/", function(req, res) {
  res.send("test!");
});

app.set("port", process.env.PORT || 3000);
app.get("/whatup", function(req, res) {
  res.send("whatup");
});

// app.set("port", process.env.PORT || 3000);
// app.get("/math", function(req, res) {
//   res.send(Math.random());

http.createServer(app).listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
