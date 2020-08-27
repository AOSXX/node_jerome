const pool = require("../models/database_connection.js");
const conn = require("../models/database_connection");
let client = require("../models/client");
const db = require('../models/pg_connect');
var async = require("async");


const getAllBurger = (request, response) => { 
  async.parallel([
    
    function(callback) {
    pool.query(
    `SELECT bur.id_burger AS id_burger, bur.nom AS nom_burger, bur.prix AS prix_burger FROM burger AS bur ORDER BY id_burger ASC
    `,callback)},
    
    function(callback) {
      pool.query(
      `SELECT rel.fk_id_ingredient AS id_ingredient, ing.ingredient_nom AS ingredient_nom, rel.fk_id_burger AS id_burger, bur.nom AS nom_burger
      FROM rel_burger_ingredient AS rel 
      INNER JOIN ingredient AS ing ON  rel.fk_id_ingredient = ing.id_ingredient
      INNER JOIN burger AS bur ON rel.fk_id_burger = bur.id_burger
      ORDER BY rel.fk_id_ingredient ASC
      `
      ,callback)},
      function(callback) {
        pool.query(
          `SELECT ing.id_ingredient, ing.ingredient_nom AS nom_ingredient FROM ingredient AS ing 
          ORDER BY ing.id_ingredient ASC
        `
        ,callback)}], function(err,results){
      response.render("burger.ejs", {data: results[0].rows, data2: results[1].rows, data3: results[2].rows} );
      console.log("Mes burgers",results[0].rows);
      console.log("Mes relations",results[1].rows);
      console.log("Mes ingredients",results[2].rows);
    }    
  );
  
};


const createBurger = (request, response) => {

    
  pool.query(
      "INSERT INTO burger DEFAULT VALUES",
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).redirect('/burger');
      }
    );
  };


const updateBurger = (request, response) => {
    const { nom_burger, nom_ingredients } = request.body;
    console.log(nom_ingredients); 
    const id = request.params.id;
    
    pool.query(
      "DELETE FROM rel_burger_ingredient WHERE fk_id_burger = $1;" ,
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
      }
    );

    if( nom_ingredients != null){
    for (let i = 0; i < nom_ingredients.length; i++) {
      pool.query("INSERT INTO rel_burger_ingredient VALUES ($1,$2);" ,
      [ id, nom_ingredients[i]],
      (error, results) => {
        if (error) {
          throw error;
        }
      })
  }}
    pool.query(
      "UPDATE burger SET nom = $1 WHERE id_burger = $2;" ,
      [nom_burger, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(202).redirect('/burger');
      }
    );
  };


  const deleteBurger = (request, response) => {
    const id = request.params.id;
    db.multi("DELETE FROM rel_burger_ingredient WHERE fk_id_burger = $1;DELETE FROM burger WHERE id_burger = $1;", [id]) 
     .then(() =>{
      response.redirect('/burger');}) 
     .catch (error => {
      console.log(error);
  })
     };


  module.exports = {
    getAllBurger,
    createBurger,
    updateBurger,
    deleteBurger
  };
  