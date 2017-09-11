const express = require("express");
const router = express.Router();
const database = require("./queries");

router.post("/login", database.login);
// router.post("/users", queries);
// router.post("/favorites", queries);

module.exports = router;
