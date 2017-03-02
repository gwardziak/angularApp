const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const dbConfig = require('./config.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cookies = require( "cookies" );
const cookieParser = require('cookie-parser');

const connection = mysql.createConnection(dbConfig);

const app = express();
const guestRouter = express.Router();
const userRouter = express.Router();
const adminRouter = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('superSecret', 'dupa');

function isInt(n) { // do innego pliku - jakiegos utils albo co
    return Number(n) === n && n % 1 === 0;
};

const SALT_LENGTH = 10;


//Token handler zajebisty

guestRouter.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  	const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.access_token;
  	console.log(token);
  	// decode token
  	if (token) {
    	// verifies secret and checks exp
    	jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      		if (err) {
        		req.decoded = { 
        		tokenSuccess: false,
        		message: 'Failed to authenticate token.',
        		userStatus: 'guest' 
        		}
        		next();   
     		} 
     		else {
        		// if everything is good, save to request for use in other routes
        		console.log(decoded);
        		req.decoded = decoded;    
        		next();
     		};
   		});
  	}
  	else {
    	// if there is no token
    	req.decoded = {
    		tokenSuccess: false,
        	message: 'No token provided.',
        	userStatus: 'guest' 
    	}
    	next();    
  	};
});
//ZAJEBISTY ROUTE W CHUJ 
guestRouter.get('/offers', function (req, res) {
	const offset = parseInt(req.query.offset);
	const limit = parseInt(req.query.limit);
	const data = {
		userStatus: req.decoded.userStatus
	};

	if (!isInt(limit) || !isInt(offset) ){
		data.message = "Podane parametry są nieprawdiłowe"
 		return res.json(data);
	}

	return connection.query('SELECT * FROM offers LIMIT ?, ?', [offset, limit], function(err, rows) {
		if (err) { 
			console.error(err);
			data.message = "Podczas pobierania ofert wystapil blad"; 
			return res.json(data);
		}
		data.offers = rows;
		return res.json(data);
	});
});
// tez chyba zajebisty
guestRouter.get('/offers/:offerId/details', function (req, res) {
	const offerId = parseInt(req.query.offerId);
	const data = {
		userStatus: req.decoded.userStatus
	};

	if (!isInt(offerId)){
		data.message = "Podane parametry są nieprawdiłowe"
 		return res.json(data);
	}
	
	return connection.query('SELECT * FROM offers WHERE Id=?', [offerId], function(err, rows) {
		if (err) { 
			console.error(err); 
			data.message = "Podczas pobierania szczegolow oferty"; 
			return res.json(data);
		}
		data.offers = rows;
		return res.json(data);
	});
});
//logowanie boskie 
guestRouter.post('/login', function (req, res) {
    const username = req.body.username; // nie sprawdzasz czy ktos wogole wyslal te parametry i czy sa  ok....
    const password = req.body.password;	//CHYBA KURWA NIE MUSZE I THINK SO.
	const data = {
		userStatus: req.decoded.userStatus
	};

    connection.query('SELECT id FROM users WHERE username=?', [username], function(err, rows) {
		if (err) { 
			console.error(err); 
			data.message = "Wystapil blad podczas pobierania uzytkownika";
			return res.json(data);
		}
		if (rows.length === 0) {
			data.message = "User nie istnieje";
			return res.json(data);
		}
		return connection.query('SELECT password FROM users WHERE username=?', [username], function(err, rows) {
			if (err) { 
				console.error(err); 
				data.message = "wystapil blad podczas pobierania hasla";
				return res.json(data);
			}
			// zapomniales sprawdzic dlugosci rows

			bcrypt.compare(password, rows[0].password, function(err, isPasswordOk) {
				if (err) { 
					console.error(err); 
					data.message = "Podane haslo jest nieprawdiłowe";
					return res.json(data);
				}
				if (isPasswordOk) {
					connection.query('SELECT userStatus FROM users WHERE username=?', [username], function(err, userStatus) {
						if (err) { 
							console.error(err);
							data.message = "Wystapil blad podczas pobierania inf. o uzytkowniku"; 
							return res.json(data);
						}				
						var token = jwt.sign({user: username, userStatus: userStatus[0].userStatus}, app.get('superSecret')); //dodac secret do configu
						new Cookies(req,res).set('access_token',token,{
					  		httpOnly: true
						});
						//data.message = 'Zalogowano i stworzono token!'
						// potrzebny redirect do offers, aby uwzglednic zalogowanie
						//return res.json(data);
						return res.redirect('/offers'); //parametry do podania w ang. chyba
        			});
				}
				else {
					data.message = "haslo nieprawdiłowe";
					return res.json(data);
				};
			});
		});
	});    
});
//Chyba gitarka
guestRouter.post('/createAccount', function (req, res) {
	const username = req.body.username;
    const password = req.body.password; // nie sprawdziles parametrow
    const data = {
		userStatus: req.decoded.userStatus
	};

    connection.query('SELECT id FROM users WHERE username=?', [username], function(err, rows) {
		if (err) { 
			console.error(err); 
			data.message = "Wystapil blad podczas tworzenia uzytkownika";
			return res.json(data);
		}
		if (rows.length > 0) {
			data.message = "uzytkownik" + username + "juz istnieje";
			return res.json(data);
		}
		
		return bcrypt.hash(password, SALT_LENGTH, function(err, hash) {
			if (err) { 
				console.error(err);
				data.message = "wystapil blad przy hashowaniu hasła";
				return res.json(data);
			}

			return connection.query('INSERT INTO users (`id`, `username`, `password`) VALUES (?, ?, ?)', [null, username, hash], function(err, rows) {
				if (err) { 
					console.error(err); 
					data.message = "wystapil blad przy dodawaniu uzytkownika";
					return res.json(data);
				}
				data.message = "uzytkownik zostal utworzony poprawnie";
				return res.json(data);
			});   
		});	
	});
});

//ROUTEguest DO ODZYSKIWANIA KONTA

//ROUTEuser DO WYLOGUJ usuwanie ciastka token
userRouter.get('/offers/:offerId/reservation', function (req, res) {

});

userRouter.route('/manageAccount/:username')
	.get(function (req, res) {
		const username = req.query.username; // w sumie tutaj nie muisz sprawdzac czy jest undefined bo nigdy nie bedzie bo :username

		return connection.query('SELECT * FROM users WHERE username=?', [username], function(err, rows) {
			if (err) { 
				console.error(err); 
				return res.send("wystapil nieoczekiwany blad podczas pobierania szczegolow oferty");
			}
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
			if (err) { 
				console.error(err); 
				return res.send("wystapil nieoczekiwany blad podczas pobierania szczegolow oferty");
			}
			return res.send("user has been deleted"); // json
		});
	});

userRouter.get('/manageAccount/:username/reservationHistory', function (req, res) {

})

adminRouter.get('/offers/manage', function (req, res) {
	//put/post/del/get userow ofert, 
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