const connection = require('../myUtils/dbConnect.js');

module.exports = {
	get: function (req, res) {
		const username = req.query.username; // w sumie tutaj nie muisz sprawdzac czy jest undefined bo nigdy nie bedzie bo :username
		if(req.decoded.userStatus != "guest") {
			return connection.query('SELECT * FROM users WHERE username=?', [username], function(err, rows) {
				if (err) { 
					console.error(err); 
					return res.json("wystapil nieoczekiwany blad podczas pobierania danych uzytkownika");
				}
				// sprawdzic dlugosc rows i ew napisac jsonem ze niema takiego usera
				return res.json(rows);
			});
		}
		else
			return res.redirect('/offers'); //parametry do podania w ang. chyba
	},
	put: function (req, res) {
		if(req.decoded.userStatus != "guest") {
			const decodedUsername = req.decoded.user;
			const username = req.body.username;
			return connection.query('UPDATE users set username=? WHERE username=?', [username, decodedUsername], function(err, rows) {
				if (err) { 
					console.error(err); 
				return res.json("wystapil blad podczas edytowania danych");
				}

				return res.redirect('/manageAccount/:username');
			});
		}
		else
			return res.redirect('/offers'); //parametry do podania w ang. chyba
	},
	delete: function (req, res) {
		const username = req.query.username;
		if(req.decoded.userStatus != "guest") {
		return connection.query('DELETE FROM users WHERE username=?', [username], function(err, rows) {
			if (err) { 
				console.error(err); 
				return res.json("wystapil nieoczekiwany blad podczas usuwania uzytkownika");
			}
			return res.redirect('/offers');
		});
		}
		else
			return res.redirect('/offers'); //parametry do podania w ang. chyba
	}
};