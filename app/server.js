var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var json = require('json');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'appdatabase'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.get('/getAmountOfOffers', function (req, res) {
	connection.query('SELECT COUNT(*) AS amountOfOffers FROM offers', function(err, rows) {
  		if (err) throw err;
    	return res.json(rows[0].amountOfOffers);
  })
});

app.get('/getRecordsToDisplay', function (req, res) {
  var numberOfRecord = parseInt(req.query.numberOfRecord);
	connection.query('SELECT * FROM offers LIMIT ?, 4',[numberOfRecord], function(err, rows) {
 		 if (err) throw err;
    return res.json(rows);
  	})
});

app.all('/*', function(req, res) {
	return res.sendFile(path.join(__dirname, 'pierwszy.html'));
});

var server = app.listen(81, function () {
  	console.log('server online');
});

