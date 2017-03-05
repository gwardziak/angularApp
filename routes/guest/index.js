const guest = require('express').Router();
const offers = require('./offers');
const singleOffer = require('./singleOffer');
const login = require('./login');
const createAccount = require('./createAccount');
const lostAccount = require('./lostAccount');

guest.get('/offers', offers);
guest.get('/offers/:offerId/details', singleOffer);
guest.post('/login', login);
guest.post('/createAccount', createAccount);
guest.post('/lostAccount', lostAccount);

module.exports = guest;