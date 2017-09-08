const promise = require(express);

var pgp = require("pg-promise")(options);
var connectionString = "postgres://localhost:5432/profiles";
var db = pgp(connectionString);
