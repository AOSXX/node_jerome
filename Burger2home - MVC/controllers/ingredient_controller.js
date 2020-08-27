const pool = require("../models/database_connection.js");
const conn = require("../models/database_connection");
let client = require("../models/client");
const db = require('../models/pg_connect');
var async = require("async");

const getAllIngredient = (request, response) => { 
  var data_test = [];
  async.parallel([
    
    function(callback) {
    pool.query(
    `SELECT ing.id_ingredient, ing.ingredient_nom AS nom_ingredient FROM ingredient AS ing 
     ORDER BY ing.id_ingredient ASC
    `,callback)},
    
    function(callback) {
      pool.query(
      `SELECT rel.fk_id_ingredient AS id_ingredient, rel.fk_id_allergene AS id_allergene, allergene.nom AS allergene_name
      FROM rel_ingredient_allergene AS rel INNER JOIN allergene ON rel.fk_id_allergene = allergene.id_allergene
      ORDER BY rel.fk_id_ingredient ASC`
      ,callback)}], function(err,results){
      response.render("ingredient.ejs", {data: results[0].rows, data2: results[1].rows} );
      //console.log(data);
      //console.log(results.rows);
      // for(let i = 0; i < results.rows.length; i++)
      // {
      // //console.log(results.rows[i].id_ingredient);
      // data_test.push(results.rows[i].id_ingredient);
      // console.log(data_test);
      // }
    }    
  );
  //console.log("outside"+data_test[0]);
};
// const getAllAllergene = (request, response) => { 
  
//   pool.query(
//     `SELECT ing.id_ingredient, ing.ingredient_nom AS nom_ingredient, alle.nom AS nom_allergene FROM ingredient AS ing 
//     LEFT JOIN rel_ingredient_allergene ON ing.id_ingredient = rel_ingredient_allergene.fk_id_ingredient
//     LEFT JOIN allergene AS alle ON rel_ingredient_allergene.fk_id_allergene = alle.id_allergene ORDER BY ing.id_ingredient ASC
//     `,
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       console.log(results);
//       response.render("ingredient.ejs", {data2: results.rows} );
//     }
//   );
  
// };

const createIngredient = (request, response) => {
  // for (let i = 0; i < 3; i++) {
  //   console.log("coucou"+"hello");
  // }
    
  pool.query(
      "INSERT INTO ingredient DEFAULT VALUES",
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).redirect('/ingredient');
      }
    );
  };

const updateIngredient = (request, response) => {
    const { nom_ingredient, nom_allergenes } = request.body;
    const id = request.params.id;
    
    pool.query(
      "DELETE FROM rel_ingredient_allergene WHERE fk_id_ingredient = $1;" ,
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
      }
    );
    if( nom_allergenes != null){
    for (let i = 0; i < nom_allergenes.length; i++) {
      pool.query("INSERT INTO rel_ingredient_allergene VALUES (DEFAULT,$2,$1)" ,
      [ id, nom_allergenes[i]],
      (error, results) => {
        if (error) {
          throw error;
        }
      })
  }}
    pool.query(
      "UPDATE ingredient SET ingredient_nom = $1 WHERE id_ingredient = $2;" ,
      [nom_ingredient, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(202).redirect('/ingredient');
      }
    );
  };

  const deleteIngredient = (request, response) => {
    const id = request.params.id;
    db.multi("DELETE FROM ingredient WHERE id_ingredient = $1; DELETE FROM rel_ingredient_allergene WHERE fk_id_ingredient = $1", [id]) 
     .then(() =>{
      response.redirect('/ingredient');}) 
     .catch (error => {
      console.log(error);
  })
    
  };


module.exports = {
    getAllIngredient,
    createIngredient,
    updateIngredient,
    deleteIngredient
  };