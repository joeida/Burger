var connection = require('../config/connection.js');

// Create array of question marks based on number passed
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push('?');
    }

    return arr.toString();
}

// convert object to column=value format and return
function objToSql(obj) {
    // column1=value, column2=value2,...
    var arr = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push(key + '=' + obj[key]);
        }
    }

    return arr.toString();
}

var orm = {

    // Query database using specified table and pass object result to VIEW render callback
    selectAll: function(table, cb) {
        var queryString = 'SELECT * FROM ' + table + ';';

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    // Query database using specified table, cols, vals and call VIEW redirect callback to /burgers rendering route
    insertOne: function(table, cols, vals, cb) {
        var queryString = 'INSERT INTO ' + table;
        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += printQuestionMarks(vals.length);
        queryString += ') ';

        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    // Query database using specified table, objColVals, searchCondition and call VIEW callback to /burgers rendering route
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = 'UPDATE ' + table;
        queryString += ' SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }

}

module.exports = orm;
