const client = require('./controllers/client_controller.js')
const routes = require('./routes/routes')
//var sass = require('node-sass');
//var path = require('path');

// Import express
var express = require('express');
const bodyParser = require('body-parser');

// Initialize the app
let app = express();

// Setup server port
let port = process.env.PORT || 8080;

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Launch app to listen to specified port
app.listen(port, function () {
console.log('Server running on port ' + port);});

//Usage css
app.use('/css', express.static('css'));

//Define routes
app.use('/', routes);

// Manage bad route
app.use(function(req, res, next){
    res.status(404).json('Error - 404');
});

