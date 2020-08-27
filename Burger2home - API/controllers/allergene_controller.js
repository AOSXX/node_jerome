const pool = require("../models/database_connection.js");


const getAllAllergene  = (request, response) => {
  pool.query("SELECT * FROM allergene", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};




module.exports = {
  getAllAllergene
};
