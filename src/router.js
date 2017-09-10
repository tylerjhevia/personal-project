const express = require("express");
const router = express.Router();
const db = require("./queries");

router.post("/users", queries);

module.exports = router;
