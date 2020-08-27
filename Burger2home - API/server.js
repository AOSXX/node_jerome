const client = require('./controllers/client_controller.js');
const allergene = require('./controllers/allergene_controller.js');
const burger = require('./controllers/burger_controller.js');
const ingredient = require('./controllers/ingredient_controller.js');
const rel_burger = require('./controllers/rel_ingredient_burger_controller.js');
const rel_allergene = require('./controllers/rel_allergene_ingredient_controller.js');
const ligne = require('./controllers/ligne_commande_controller.js');
const commande = require('./controllers/commande_controller.js');

// Import express
const express = require('express');
const bodyParser = require('body-parser');
const { getAllAllergene } = require('./controllers/allergene_controller.js');

// Initialize the app
let app = express();

// Setup server port
let port = process.env.PORT || 8080;

//Bodyparser Json
app.use(bodyParser.json())

// Launch app to listen to specified port
app.listen(port, function () {
console.log('Server running on port ' + port);});

// Appel API client
app.get('/get_all_client', client.getAllClients)
app.get('/client/:id', client.getClientById)
app.post('/create_client', client.createClient)
app.put('/update_client', client.updateClient)
app.delete('/delete_client', client.deleteClient)

// APPEL API allergene
app.get('/get_all_allergene', allergene.getAllAllergene)

//APPEL API burger
app.get('/get_all_burger', burger.getAllBurger)
app.get('/burger/:id', burger.getBurgerById)
app.post('/create_burger', burger.createBurger)
app.put('/update_burger', burger.updateBurger)
app.delete('/delete_burger', burger.deleteBurger)

//APPEL API Ingredient
app.get('/get_all_ingredient', ingredient.getAllIngredient)
app.get('/ingredient/:id', ingredient.getIngredientById)
app.post('/create_ingredient', ingredient.createIngredient)
app.put('/update_ingredient', ingredient.updateIngredient)
app.delete('/delete_ingredient', ingredient.deleteIngredient)

//APPEL API rel burger
app.get('/get_rel_burger', rel_burger.getRelBurgertById)
app.post('/create_rel_burger',rel_burger.createRelBurger)
app.put('/update_rel_burger', rel_burger.updateRelBurger)
app.delete('delete_rel_burger',rel_burger.deleteRelBurger)

//APPEL API rel allergene
app.get('/get_rel_allergene', rel_allergene.getRelAllergeneById)
app.post('/create_rel_allergene',rel_allergene.createRelAllergene)
app.put('/update_rel_allergene', rel_allergene.updateRelAllergene)
app.delete('/delete_rel_allergene',rel_allergene.deleteRelAllergene)

//APPEL API ligne commande
app.post('/create_ligne', ligne.createLigneCommande)
app.put('/update_ligne', ligne.updateLigneCommande)
app.delete('/delete_ligne', ligne.deleteLigneCommande)

//APPEL API commande
app.get('/get_all_commande', commande.getAllCommande)
app.post('/create_commande', commande.createCommande)
app.put('/update_commande', commande.updateCommande)
app.delete('/delete_commande', commande.deleteCommande)
app.get('/get_commande/:id',commande.getCommandeById)

// Manage bad route
app.use(function(req, res, next){
    res.status(404).json('Appel API mauvais!');
});

