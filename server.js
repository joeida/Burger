var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Create express object
var app = express();

// Serve up static and rendered content from "public" directory
app.use(express.static(process.cwd() + '/public'));

// Use body-parser to parse url entries
app.use(bodyParser.urlencoded({
    extended: false
}));

// Override with POST having ?_method="" set value
app.use(methodOverride('_method'));

var exphbs = require('express-handlebars');

// Set express engine to use handlebars using express-handlbars default layout in main.handlebars file
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

// Set express view to use handlbars engine
app.set('view engine', 'handlebars');

// Define location of server routes
var routes = require('./controllers/burgers_controller.js');

// Define routes to use in root directory
app.use('/', routes);

// Define port number and start server listening on defined port number
var port = process.env.PORT || 3000;
app.listen(port);