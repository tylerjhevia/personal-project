// const express = require("express");
// const router = express.Router();
// const databaseb = require("./queries");

router.post("/users", queries);
router.post("/favorites", queries);

module.exports = router;

var express = require("express");
var router = express.Router();
var controller = require("./controller");

router.post("/login", controller.login);
