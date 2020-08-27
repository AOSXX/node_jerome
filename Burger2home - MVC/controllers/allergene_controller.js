const pool = require("../models/database_connection.js");
const conn = require("../models/database_connection");
let client = require("../models/client");

const getAllAllergene = (request, response) => { 
    pool.query(
      "SELECT * FROM allergene ORDER BY id_allergene ASC",
      (error, results) => {
        if (error) {
          throw error;
        }
        response.render("allergene.ejs", {data: results.rows} );
      }
    );
  };

  module.exports = {
    getAllAllergene
  };
  