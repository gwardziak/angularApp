const connection = require('../myUtils/dbConnect.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cookies = require( "cookies" );
const config = require('../../config.js');

module.exports = function (req, res) {
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
						var token = jwt.sign({user: username, userStatus: userStatus[0].userStatus}, config.superSecret);
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
};