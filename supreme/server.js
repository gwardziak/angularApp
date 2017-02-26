var express = require('express');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var dbConfig = require('./config.js');
var bcrypt = require('bcrypt');


var app = express();
var connection = mysql.createConnection(dbConfig);
var guestRouter = express.Router();
var userRouter = express.Router();
var adminRouter = express.Router();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

function isInt(n){
    return Number(n) === n && n % 1 === 0;
};


guestRouter.get('/offers', function (req, res) {
	var offset = parseInt(req.query.offset);
	var limit = parseInt(req.query.limit);

	if (isInt(limit) && isInt(offset) ){
		connection.query('SELECT * FROM offers LIMIT ?, ?', [offset, limit], function(err, rows) {
			if (err) throw err;
			return res.json(rows);
		});
 	}
 	else
 		return res.send("Podane parametry są nieprawdiłowe")
});

guestRouter.get('/offers/:offerId/details', function (req, res) {
	var offerId = parseInt(req.query.offerId);

	if (isInt(offerId)){
		connection.query('SELECT * FROM offers WHERE Id=?', [offerId], function(err, rows) {
			if (err) throw err;
			return res.json(rows);
		});
 	}
 	else
 		return res.send("Podane parametry są nieprawdiłowe");
});

guestRouter.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    connection.query('SELECT id FROM users WHERE username=?', [username], function(err, rows) {
		if (err) throw err;
		if (rows.length == 0)
			return res.send("User nie istnieje");
		else {
			connection.query('SELECT password FROM users WHERE username=?', [username], function(err, rows) {
				if (err) throw err;
				bcrypt.compare(password, rows[0].password, function(err, isMatch) {
					if (err) throw err;
                    if(isMatch)
                        return res.send("zalogowano");
                    else
                        return res.send("haslo nieprawdiłowe");
                });
			});
		};
	});    
});

guestRouter.post('/createAccount', function (req, res) {
	var username = req.body.username;
    var password = req.body.password;

    connection.query('SELECT id FROM users WHERE username=?', [username], function(err, rows) {
		if (err) throw err;
		if (rows.length == 0) {
			bcrypt.genSalt(10, function(err, salt) {
				if (err) throw err;
				bcrypt.hash(password, salt, function(err, hash) {
					if (err) throw err;
					connection.query('INSERT INTO users (`id`, `username`, `password`) VALUES (?, ?, ?)', [null, username, hash], function(err, rows) {
						if (err) throw err;
							return res.send("user has been created");
					});   
				});
			});		
		}
		else
			return res.send("user already exist");
	});
});

userRouter.get('/offers/:offerId/reservation', function (req, res) {

})

userRouter.route('/manageAccount/:username')
	.get(function (req, res) {
		var username = req.query.username;
		if(username != undefined){ //FUNKCJA DO ZROBIENIA
			connection.query('SELECT * FROM users WHERE username=?', [username], function(err, rows) {
				if (err) throw err;
				return res.json(rows);
			});
		}
		else
			return res.send("bledny parametr");
	})
	.put(function (req, res) {
	    res.send('Update the book')
	})
	.delete(function (req, res) {
		var username = req.query.username;
		console.log(username);
		if(username != undefined){
			connection.query('DELETE FROM users WHERE username=?', [username], function(err, rows) {
				if (err) throw err;
				return res.send("user has been deleted"); //redirect do offers
			});
		}
		else
			return res.send("bledny parametr");
	});

userRouter.get('/manageAccount/:username/reservationHistory', function (req, res) {

})

adminRouter.get('/offers/manage', function (req, res) {
	//put/post/del/get
})

app.use('/', guestRouter);
app.use('/', userRouter);

app.all('/*', function(req, res) {
	return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

connection.connect(function(err) {
	if (err) throw Error('error connecting: ' + err.stack);
	var port = 3000;
	var server = app.listen(port, function() {
		console.log('server online at port ' + port);
	});

});