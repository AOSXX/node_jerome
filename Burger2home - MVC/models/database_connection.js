const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'burger_home',
  password: 'root',
  port: 5432,
});

  
  const conn = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'burger_home',
    password: 'root',
    port: 5432,
  })

 

module.exports = pool, conn;