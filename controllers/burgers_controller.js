var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

// Create route for / root get request
router.get('/', function(req, res) {
    // Redirect to /burgers route
    res.redirect('/burgers');
});

// Create route for /burgers get request
router.get('/burgers', function(req, res) {
    // Call burger selectAll function from Model with render callback for VIEW
    burger.selectAll(function(data) {
        var burgerObj = {burger: data};
        res.render('index', burgerObj);
    });
});

// Create route for /burgers/create post request
router.post('/burgers/create', function(req, res) {
    // Call burger insertOne function from Model with /burgers redirect callback for VIEW
    burger.insertOne(['burger_name'], [req.body.name], function() {
        res.redirect('/burgers');
    });
});

// Create route for /burgers/update put request
router.put('/burgers/update/:burgerId', function(req, res) {
    var burgerId = 'id = ' + req.params.burgerId;
    // Call burger updateOne function from Model with /burgers redirect callback for VIEW
    burger.updateOne({ devoured: req.body.devoured }, burgerId, function() {
        res.redirect('/burgers');
    });
});

module.exports = router;