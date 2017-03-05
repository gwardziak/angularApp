const isInt = require('../myUtils/isInt.js');
const connection = require('../myUtils/dbConnect.js');

module.exports = function (req, res) {
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
};