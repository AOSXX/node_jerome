const pool = require("../models/database_connection.js");
const conn = require("../models/database_connection");
let client = require("../models/client");
const db = require('../models/pg_connect');
var async = require("async");


const getAllCommande = (request, response) => { 
  async.parallel([
    
    function(callback) {
    pool.query(
    `SELECT commande.id_commande AS id_commande, commande.date AS date_commande, commande.prix AS prix_commande,
    commande.fk_id_client AS id_client, client.nom AS nom_client
    FROM commande
    LEFT JOIN client ON commande.fk_id_client = client.id_client
    `,callback)},
    
    function(callback) {
      pool.query(
      `SELECT commande.id_commande AS id_commande, commande.date AS date_commande, commande.prix AS prix_commande,
      commande.fk_id_client AS id_client, client.nom,
      lc.id_ligne, lc.quantite, burger.id_burger AS id_burger, burger.nom, burger.prix
      FROM commande
      LEFT JOIN client ON commande.fk_id_client = client.id_client
      LEFT JOIN ligne_commande AS lc ON commande.id_commande = lc.fk_id_commande
      LEFT JOIN burger ON lc.fk_id_burger = burger.id_burger
      ORDER BY commande.id_commande ASC
      `
      ,callback)},

      function(callback) {
        pool.query(
          `SELECT id_burger, nom AS nom_burger, prix AS prix_burger
          FROM burger;
        `
        ,callback)},
        
        function(callback) {
        pool.query(
          `SELECT id_client, client.nom AS nom_client
          FROM client;
        `
        ,callback)}],

        function(err,results){
            console.log("Mes commandes",results[0].rows);
            response.render("commande.ejs", {data: results[0].rows
         , data2: results[1].rows, data3: results[2].rows
         , data4: results[3].rows
    } );
    //    console.log("Mes commandes data",results[0].rows);
       console.log("Mes relations data2",results[1].rows);
       console.log("Mes burgers data3",results[2].rows);
    //    console.log("Mes clients data4", results[3].rows);
    }    
);
  
};


const createCommande = (request, response) => {

    
  pool.query(
      "INSERT INTO commande DEFAULT VALUES",
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).redirect('/commande');
      }
    );
  };


const updateCommande = (request, response) => {
    const { id_burger, quantite, id_client} = request.body;
    console.log("Mes burgers", id_burger); 
    console.log("Mes qte",quantite);
    console.log("MOn client", id_client);
    const id = request.params.id;
    console.log(id);
    
    pool.query(
      "DELETE FROM ligne_commande WHERE fk_id_commande = $1;" ,
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
      }
    );

    for (let i = 0; i < id_burger.length; i++) {
      pool.query("INSERT INTO ligne_commande (quantite,fk_id_burger,fk_id_commande) VALUES ($3,$2,$1);" ,
      [ id, id_burger[i], quantite[i]],
      (error, results) => {
        if (error) {
          throw error;
        }
      })
  }
    pool.query(
        `UPDATE commande SET fk_id_client = $1 WHERE id_commande = $2;` ,
        [id_client, id],
        (error, results) => {
        if (error) {
            throw error;
        }
        }
    );
    pool.query(
        `UPDATE commande SET prix = calcul.PrixSum FROM commande AS c INNER JOIN 
          (SELECT 
           SUM(burger.prix*ligne_commande.quantite) AS PrixSum, ligne_commande.fk_id_commande FROM ligne_commande 
           INNER JOIN burger ON ligne_commande.fk_id_burger = burger.id_burger  WHERE ligne_commande.fk_id_commande = $1 GROUP BY ligne_commande.fk_id_commande) 
           AS calcul 
           ON calcul.fk_id_commande = c.id_commande
          WHERE commande.id_commande = $1` ,
        [id],
        (error, results) => {
        if (error) {
            throw error;
        }
        response.status(202).redirect('/commande');}
          
    );

};


  const deleteCommande = (request, response) => {
    const id = request.params.id;
    db.multi("DELETE FROM ligne_commande WHERE fk_id_commande = $1;DELETE FROM commande WHERE id_commande = $1; ", [id]) 
     .then(() =>{
      response.redirect('/commande');}) 
     .catch (error => {
      console.log(error);
  })
     };

     const createLigneCommande = (request, response) => {
        const id = request.params.id;
    
        pool.query(
            "INSERT INTO ligne_commande (fk_id_commande) VALUES ($1)",[id],
            (error, results) => {
              if (error) {
                throw error;
              }
              response.status(201).redirect('/commande');
            }
          );
        };

        const deleteLigneCommande = (request, response) => {
            const id = request.params.id;
            db.multi("DELETE FROM ligne_commande WHERE id_ligne = $1", [id]) 
             .then(() =>{
              response.redirect('/commande');}) 
             .catch (error => {
              console.log(error);
          })
             };
      


  module.exports = {
    getAllCommande,
    createCommande,
    deleteCommande,
    createLigneCommande,
    deleteLigneCommande,
    updateCommande
  };
  