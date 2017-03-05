module.exports = function (req, res) {
	const username = req.query.username;
	if(req.decoded.userStatus != "guest") {
		res.clearCookie("access_token");
		return res.redirect('/offers'); // ????
	}
	else {
		return res.redirect('/offers'); //parametry do podania w ang. chyba
	}

};