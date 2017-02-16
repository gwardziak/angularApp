var express = require('express');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');

try {
	var dbConfig = require('./db.config');
} catch (e) {
	console.error("Copy and rename 'db.config.js.sample' to 'db.config.js'");
	process.exit(1);
}

var app = express();
var connection = mysql.createConnection(dbConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'front-end')));

app.get('/getAmountOfOffers', function(req, res) {
	connection.query('SELECT COUNT(*) AS amountOfOffers FROM offers', function(err, rows) {
		if (err) throw err;
		return res.json(rows[0].amountOfOffers);
	})
});

app.get('/getRecordsToDisplay', function(req, res) {
	var numberOfRecord = parseInt(req.query.numberOfRecord);
	connection.query('SELECT * FROM offers LIMIT ?, 4', [numberOfRecord], function(err, rows) {
		if (err) throw err;
		return res.json(rows);
	})
});

app.all('/*', function(req, res) {
	return res.sendFile(path.join(__dirname, 'front-end', 'pierwszy.html'));
});

connection.connect(function(err) {
	if (err) throw Error('error connecting: ' + err.stack);

	var server = app.listen(3000, function() {
		console.log('server online');
	});
});
