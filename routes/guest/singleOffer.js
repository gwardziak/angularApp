const isInt = require('../myUtils/isInt.js');
const connection = require('../myUtils/dbConnect.js');

module.exports = function (req, res) {
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
};