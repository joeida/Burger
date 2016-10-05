var orm = require('../config/orm.js');

var burger = {
    // Call selectAll ORM function including database table name and callback with VIEW render callback
    selectAll: function(cb) {
        orm.selectAll('burgers', function(res) {
            cb(res);
        });
    },

    // Call InsertOne ORM function including database table name, cols, vals, and callback with VIEW redirect callback 
    insertOne: function(cols, vals, cb) {
        orm.insertOne('burgers', cols, vals, function(res) {
            cb(res);
        });
    },

    // Call updateOne ORM functiojn including databae table name, objColVals, searchCondition, and callback with VIEW redirect callback
    updateOne: function(objColVals, condition, cb) {
        orm.updateOne('burgers', objColVals, condition, function(res) {
            cb(res);
        });
    }
};

module.exports = burger;
