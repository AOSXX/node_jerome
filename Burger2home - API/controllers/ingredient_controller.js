const pool = require("../models/database_connection.js");


const getAllIngredient = (request, response) => {
  pool.query("SELECT * FROM ingredient", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getIngredientById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM ingredient WHERE id_ingredient = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createIngredient = (request, response) => {
  const {name} = request.body;
  //request.body;
  pool.query(
    "INSERT INTO ingredient (ingredient_nom) VALUES ($1)",
    [name],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Ingredient ajouté: ${name}`);
    }
  );
};

const updateIngredient = (request, response) => {

  const { name, id} = request.body;

  pool.query(
    "UPDATE ingredient SET ingredient_nom = $1 WHERE id_ingredient = $2",
    [name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Ingredient modified with ID: ${id}`);
    }
  );
};

const deleteIngredient = (request, response) => {
  const {id} = request.body;
  pool.query("DELETE FROM ingredient WHERE id_ingredient = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Ingredient deleted with ID: ${id}`);
  });
};

module.exports = {
  getAllIngredient,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient
};
