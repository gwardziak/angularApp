const port = 3000;
const salt = 10;
const secret = "dupa";

module.exports = {
	dbConfig: {
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'appdatabase'
	},
	port: port,
	saltLength: salt,
	superSecret: secret
};
