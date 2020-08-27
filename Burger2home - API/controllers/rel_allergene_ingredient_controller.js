const pool = require("../models/database_connection.js");


const getRelAllergeneById = (request, response) => {
  const {id} = request.body;
  pool.query(
    "SELECT * FROM rel_ingredient_allergene LEFT JOIN allergene ON rel_ingredient_allergene.fk_id_allergene = allergene.id_allergene LEFT JOIN ingredient ON rel_ingredient_allergene.fk_id_ingredient = ingredient.id_ingredient WHERE fk_id_ingredient = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createRelAllergene = (request, response) => {
  const {id_allergene, id_ingredient} = request.body;
  //request.body;
  pool.query(
    "INSERT INTO rel_ingredient_allergene (fk_id_allergene,fk_id_ingredient) VALUES ($1, $2)",
    [id_allergene, id_ingredient],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Relation ajoutée: ${id_allergene} & ${id_ingredient}`);
    }
  );
};

const updateRelAllergene = (request, response) => {

  const {id_ingredient, id_allergene_new, id_allergene_old} = request.body;

  pool.query(
    "UPDATE rel_ingredient_allergene SET fk_id_allergene = $2 WHERE fk_id_ingredient = $1 AND fk_id_allergene = $3",
    [id_ingredient, id_allergene_new, id_allergene_old],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Allergene rel modified with ingredient ID: ${id_ingredient}`);
    }
  );
};

const deleteRelAllergene = (request, response) => {
  const {id} = request.body;
  pool.query("DELETE FROM rel_ingredient_allergene WHERE fk_id_ingredient = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Allergene rel deleted with ID: ${id}`);
  });
};

module.exports = {
  getRelAllergeneById,
  createRelAllergene,
  updateRelAllergene,
  deleteRelAllergene
};
