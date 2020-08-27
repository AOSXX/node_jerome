const pool = require("../models/database_connection.js");


const getAllCommande = (request, response) => {
  pool.query("SELECT * FROM commande LEFT JOIN ligne_commande ON commande.id_commande = ligne_commande.fk_id_commande LEFT JOIN burger ON ligne_commande.fk_id_burger = burger.id_burger", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getCommandeById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM commande WHERE id_commande = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createCommande = (request, response) => {
  const {id_client} = request.body;
  //request.body;
  pool.query(
    "INSERT INTO commande (fk_id_client) VALUES ($1)",
    [id_client],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Commande ajoutée avec client: ${id_client}`);
    }
  );
};

const updateCommande = (request, response) => {

  const { id_commande, id_client} = request.body;
  pool.query(
    `UPDATE commande SET prix = calcul.PrixSum FROM commande AS c INNER JOIN 
      (SELECT 
       SUM(burger.prix*ligne_commande.quantite) AS PrixSum, ligne_commande.fk_id_commande FROM ligne_commande 
       INNER JOIN burger ON ligne_commande.fk_id_burger = burger.id_burger  WHERE ligne_commande.fk_id_commande = $1 GROUP BY ligne_commande.fk_id_commande) 
       AS calcul 
       ON calcul.fk_id_commande = c.id_commande
      WHERE commande.id_commande = $1` ,
    [id_commande],
    (error, results) => {
    if (error) {
        throw error;
    }});

  
 pool.query(
    "UPDATE commande SET fk_id_client = $1 WHERE id_commande = $2",
    [id_client, id_commande],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Commande modified with ID: ${id_commande}`);
    }
  );
};

const deleteCommande = (request, response) => {
  const {id} = request.body;
  pool.query("DELETE FROM commande WHERE id_commande = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Commande deleted with ID: ${id}`);
  });
};

module.exports = {
  getAllCommande,
  createCommande,
  updateCommande,
  deleteCommande,
  getCommandeById
};
