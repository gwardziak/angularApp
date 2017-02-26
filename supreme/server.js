const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const dbConfig = require('./config.js');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection(dbConfig);

const app = express();
const guestRouter = express.Router();
const userRouter = express.Router();
const adminRouter = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

function isInt(n) { // do innego pliku - jakiegos utils albo co
    return Number(n) === n && n % 1 === 0;
};

const SALT_LENGTH = 10;

// #1 powinienes wypisac console.error(err) o zwrócic res.json jakis error bo w tem sposób to zcrashujesz serwer



guestRouter.get('/offers', function (req, res) {
	const offset = parseInt(req.query.offset);
	const limit = parseInt(req.query.limit);

	if (!isInt(limit) || !isInt(offset) )
 		return res.send("Podane parametry są nieprawdiłowe"); // to powinno byc jako json

	return connection.query('SELECT * FROM offers LIMIT ?, ?', [offset, limit], function(err, rows) {
		if (err) throw err; // #1
		return res.json(rows);
	});
});

guestRouter.get('/offers/:offerId/details', function (req, res) {
	const offerId = parseInt(req.query.offerId);

	if (!isInt(offerId))
 		return res.send("Podane parametry są nieprawdiłowe");
	
	return connection.query('SELECT * FROM offers WHERE Id=?', [offerId], function(err, rows) {
		if (err) throw err; // #1

		return res.json(rows);
	});
});

guestRouter.post('/login', function (req, res) {
    const username = req.body.username; // nie sprawdzasz czy ktos wogole wyslal te parametry i czy sa  ok....
    const password = req.body.password;

    connection.query('SELECT id FROM users WHERE username=?', [username], function(err, rows) {
		if (err) throw err; // #1
		if (rows.length === 0) return res.send("User nie istnieje"); // jako json
		
		return connection.query('SELECT password FROM users WHERE username=?', [username], function(err, rows) {
			if (err) throw err; // #1
			// zapomniales sprawdzic dlugosci rows

			bcrypt.compare(password, rows[0].password, function(err, isPasswordOk) {
				if (err) throw err; // #1
				if (isPasswordOk)
					return res.send("zalogowano"); // fajne logowanie tylko szkoda, że nie loguje usera lol
				
				return res.send("haslo nieprawdiłowe");
			});
		});
	});    
});

guestRouter.post('/createAccount', function (req, res) {
	const username = req.body.username;
    const password = req.body.password; // nie sprawdziles parametrow

    connection.query('SELECT id FROM users WHERE username=?', [username], function(err, rows) {
		if (err) throw err; // #1
		if (rows.length > 0)
			return res.send("user already exist"); // json
		
		return bcrypt.hash(password, SALT_LENGTH, function(err, hash) {
			if (err) throw err; // #1

			return connection.query('INSERT INTO users (`id`, `username`, `password`) VALUES (?, ?, ?)', [null, username, hash], function(err, rows) {
				if (err) throw err; // #1
				
				return res.send("user has been created");
			});   
		});	
	});
});

userRouter.get('/offers/:offerId/reservation', function (req, res) {

});

userRouter.route('/manageAccount/:username')
	.get(function (req, res) {
		const username = req.query.username; // w sumie tutaj nie muisz sprawdzac czy jest undefined bo nigdy nie bedzie bo :username

		return connection.query('SELECT * FROM users WHERE username=?', [username], function(err, rows) {
			if (err) throw err; // #1
			// sprawdzic dlugosc rows i ew napisac jsonem ze niema takiego usera
			return res.json(rows);
		});
	})
	.put(function (req, res) {
	    return res.send('Update the book'); // json...
	})
	.delete(function (req, res) {
		const username = req.query.username;
		
		return connection.query('DELETE FROM users WHERE username=?', [username], function(err, rows) {
			if (err) throw err; // #1
			return res.send("user has been deleted"); // json
		});
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
	if (err) throw Error(err); // tutaj możesz wyjebac blad bo to jest podczas startu serwera - lepiej odrazu widziec ze apka nie startuje

	const port = 3000; // <- do configu
	const server = app.listen(port, function(err) {
		if (err) throw Error(err);
		console.log('server online at port ' + port);
	});
});