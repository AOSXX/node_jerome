const pgp = require('pg-promise')({});

const connectionString = 
'postgresql://postgres:root@localhost:5432/burger_home';

const db = pgp(connectionString)

module.exports = db;