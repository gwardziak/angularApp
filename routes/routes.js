const routes = require('express').Router();
const tokenHandler = require('./myUtils/tokenHandler.js')
const guest = require('./guest');
const user = require('./user');
const admin = require('./admin');

routes.use(tokenHandler);
routes.use('/', guest);
routes.use('/', user);
routes.use('/admin', admin);

routes.get('/', function (req, res) {
  res.status(200).json({ message: 'Connected!' });
});
// lub + deklaracja path.
//routes.all('/*', function(req, res) {
//	return res.sendFile(path.join(__dirname, 'public', 'index.html'));
//});


module.exports = routes;


