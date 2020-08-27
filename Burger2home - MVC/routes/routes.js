const router = require('express').Router();

const client = require('../controllers/client_controller.js');
const allergene = require('../controllers/allergene_controller.js');
const ingredient = require('../controllers/ingredient_controller.js');
const burger = require('../controllers/burger_controller.js')
const connection_promise = require('../models/database_connection.js')
const commande = require('../controllers/commande_controller.js')

//Client route
router.get('/clients', client.getAllClients);
router.get('/delete_client/:id', client.deleteClient);
router.post('/update_client/:id', client.updateClient);
router.get('/create_client', client.createClient);

//Allergene route
router.get('/allergene', allergene.getAllAllergene);

//Ingredient route
router.get('/ingredient', ingredient.getAllIngredient);
router.get('/create_ingredient', ingredient.createIngredient);
router.post('/update_ingredient/:id', ingredient.updateIngredient);
router.get('/delete_ingredient/:id', ingredient.deleteIngredient);

//burger route
router.get('/burger', burger.getAllBurger);
router.get('/create_burger',burger.createBurger);
router.get('/delete_burger/:id', burger.deleteBurger);
router.post('/update_burger/:id', burger.updateBurger);

//commande route
router.get('/commande', commande.getAllCommande);
router.get('/create_commande', commande.createCommande);
router.get('/delete_commande/:id', commande.deleteCommande);
router.get('/create_ligne/:id', commande.createLigneCommande);
router.get('/delete_ligne/:id',commande.deleteLigneCommande);
router.post('/update_commande/:id', commande.updateCommande);

module.exports = router;