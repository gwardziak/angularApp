const mysql = require('mysql');
const config = require('../../config.js');

module.exports = mysql.createConnection(config.dbConfig);