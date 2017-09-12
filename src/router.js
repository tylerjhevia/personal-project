const express = require("express");
const router = express.Router();
const database = require("./queries");

router.post("http://localhost:3000/api/v1/users", database.login);
// router.post("/users", queries);
// router.post("/favorites", queries);

module.exports = router;
