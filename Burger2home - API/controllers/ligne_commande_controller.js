const pool = require("../models/database_connection.js");


// const getRelBurgertById = (request, response) => {
//   const {id} = request.body;
//   pool.query(
//     "SELECT * FROM ligne_commande LEFT JOIN burger ON ligne_commande.fk_id_burger = burger.id_burger LEFT JOIN commande ON ligne_commande.fk_id_commande = commande.id_commande WHERE fk_id_burger = $1",
//     [id],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).json(results.rows);
//     }
//   );
// };

const createLigneCommande = (request, response) => {
  const {quantite, id_burger, id_commande} = request.body;
  //request.body;
  pool.query(
    "INSERT INTO ligne_commande (quantite, fk_id_burger, fk_id_commande) VALUES ($1, $2, $3)",
    [quantite, id_burger, id_commande],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Ligne commande ajoutée`);
    }
  );
};

const updateLigneCommande = (request, response) => {

  const {id_ligne, id_burger,id_commande, quantite} = request.body;

  pool.query(
    "UPDATE ligne_commande SET fk_id_burger = $2, fk_id_commande = $3, quantite = $4 WHERE id_ligne = $1",
    [id_ligne, id_burger,id_commande, quantite],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Order line edited: ${id_ligne}`);
    }
  );
};

const deleteLigneCommande = (request, response) => {
  const {id_ligne} = request.body;
  pool.query("DELETE FROM ligne_commande WHERE id_ligne = $1", [id_ligne], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Order line deleted with ID: ${id_ligne}`);
  });
};

module.exports = {
  createLigneCommande,
  updateLigneCommande,
  deleteLigneCommande
};
