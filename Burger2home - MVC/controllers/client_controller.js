const pool = require("../models/database_connection.js");
const conn = require("../models/database_connection");
let client = require("../models/client");

const getAllClients = (request, response) => { 
  
  pool.query(
    "SELECT * FROM client ORDER BY id_client ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.render("client_list.ejs", {data: results.rows} );
    }
  );
};

const createClient = (request, response) => {
  pool.query(
    "INSERT INTO client DEFAULT VALUES",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).redirect('/clients');
    }
  );
};

const updateClient = (request, response) => {
  const { nom, prenom, rue, numero, code_postal, localite} = request.body;
  const id = request.params.id;

  pool.query(
    "UPDATE client SET nom = $1, prenom = $2, rue = $3, numero = $4, code_postal = $5, localite = $6 WHERE id_client = $7",
    [nom, prenom, rue, numero, code_postal, localite, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(202).redirect('/clients');
    }
  );
};

const deleteClient = (request, response) => {
  const id = request.params.id;
  pool.query("DELETE FROM client WHERE id_client = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.redirect('/clients');
  });
};


module.exports = {
  getAllClients,
  createClient,
  updateClient,
  deleteClient
};
