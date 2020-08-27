const pool = require("../models/database_connection.js");


const getAllBurger = (request, response) => {
  pool.query("SELECT * FROM burger", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getBurgerById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM burger WHERE id_burger = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createBurger = (request, response) => {
  const {name, price} = request.body;
  //request.body;

  pool.query(
    "INSERT INTO burger (nom, prix) VALUES ($1, $2)",
    [name, price],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Burger ajouté: ${name}`);
    }
  );
};

const updateBurger = (request, response) => {

  const { name, price, id} = request.body;

  pool.query(
    "UPDATE burger SET nom = $1, prix = $2 WHERE id_burger = $3",
    [name, price, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Burger modified with ID: ${id}`);
    }
  );
};

const deleteBurger = (request, response) => {
  const {id} = request.body;
  pool.query("DELETE FROM burger WHERE id_burger = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Burger deleted with ID: ${id}`);
  });
};

module.exports = {
  getAllBurger,
  getBurgerById,
  createBurger,
  updateBurger,
  deleteBurger
};
