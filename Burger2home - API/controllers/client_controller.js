const pool = require("../models/database_connection.js");


const getAllClients = (request, response) => {
  pool.query("SELECT * FROM client", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getClientById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM client WHERE id_client = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createClient = (request, response) => {
  const { name, firstname, street, number, zipcode, city } = request.body;
  //request.body;
  pool.query(
    "INSERT INTO client (nom, prenom, rue, numero, code_postal, localite) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, firstname, street, number, zipcode, city],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Client ajouté: ${name}`);
    }
  );
};

const updateClient = (request, response) => {

  const { name, firstname, street, number, zipcode, city, id } = request.body;

  pool.query(
    "UPDATE client SET nom = $1, prenom = $2, rue = $3, numero = $4, code_postal = $5, localite = $6 WHERE id_client = $7",
    [name, firstname, street, number, zipcode, city, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Client modified with ID: ${id}`);
    }
  );
};

const deleteClient = (request, response) => {
  const {id} = request.body;
  pool.query("DELETE FROM client WHERE id_client = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Client deleted with ID: ${id}`);
  });
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};
