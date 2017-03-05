const user = require('express').Router();
const logout = require('./logout');
const reservation = require('./reservation');
const reservationHistory = require('./reservationHistory');
const manageAccount = require('./manageAccount');

user.get('/:username/logout', logout);
user.get('/offers/:offerId/reservation', reservation);
user.get('/manageAccount/:username/reservationHistory', reservationHistory);
user.route('/manageAccount/:username')
	.get(manageAccount.get)
	.put(manageAccount.put)
	.delete(manageAccount.delete)

module.exports = user;