const pool = require("../models/database_connection.js");


const getRelBurgertById = (request, response) => {
  const {id} = request.body;
  pool.query(
    "SELECT * FROM rel_burger_ingredient LEFT JOIN burger ON rel_burger_ingredient.fk_id_burger = burger.id_burger LEFT JOIN ingredient ON rel_burger_ingredient.fk_id_ingredient = ingredient.id_ingredient WHERE fk_id_burger = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createRelBurger = (request, response) => {
  const {id_burger, id_ingredient} = request.body;
  //request.body;
  pool.query(
    "INSERT INTO rel_burger_ingredient (fk_id_burger,fk_id_ingredient) VALUES ($1, $2)",
    [id_burger, id_ingredient],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Relation ajoutée: ${id_burger} & ${id_ingredient}`);
    }
  );
};

const updateRelBurger = (request, response) => {

  const {id_burger, id_ingredient_new,id_ingredient_old} = request.body;

  pool.query(
    "UPDATE rel_burger_ingredient SET fk_id_ingredient = $2 WHERE fk_id_burger = $1 AND fk_id_ingredient = $3",
    [id_burger, id_ingredient_new,id_ingredient_old],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Burger rel modified with burger ID: ${id_burger}`);
    }
  );
};

const deleteRelBurger = (request, response) => {
  const {id} = request.body;
  pool.query("DELETE FROM rel_burger_ingredient WHERE fk_id_burger = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Burger rel deleted with ID: ${id}`);
  });
};

module.exports = {
  getRelBurgertById,
  createRelBurger,
  updateRelBurger,
  deleteRelBurger
};
