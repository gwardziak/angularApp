const admin = require('express').Router();
const manage = require('./manage');

admin.get('/offers/manage', manage);

module.exports = admin;