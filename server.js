const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connection = require('./routes/myUtils/dbConnect.js')
const config = require('./config.js');
const routes = require('./routes/routes.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//  Connect all our routes to our application
app.use('/', routes);

// Turn on that server!

connection.connect(function(err) {
	if (err) throw Error(err); // tutaj możesz wyjebac blad bo to jest podczas startu serwera - lepiej odrazu widziec ze apka nie startuje

	const server = app.listen(config.port, function(err) {
		if (err) throw Error(err);
		console.log('server online at port ' + config.port);
	});
});