const connection = require('../myUtils/dbConnect.js');
const config = require('../../config.js');
const bcrypt = require('bcrypt');

module.exports = function (req, res) {
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
		
		return bcrypt.hash(password, config.saltLength, function(err, hash) {
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
};