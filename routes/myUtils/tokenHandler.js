const jwt = require('jsonwebtoken');
const config = require('../../config.js');

module.exports = function(req, res, next) {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.access_token;
  console.log(token);
  console.log(req.body);
  console.log(req.query);
  console.log(req.cookies);
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.superSecret, function(err, decoded) {      
      if (err) {
        console.log("token niepoprawny");
        req.decoded = { 
          tokenSuccess: false,
          message: 'Failed to authenticate token.',
        	userStatus: 'guest' 
        }
        next();   
     	} 
     	else {
        // if everything is good, save to request for use in other routes
        console.log(decoded);
        req.decoded = decoded;    
        next();
     	};
   	});
  }
  else {
    console.log("brak tokenu");
    // if there is no token
    req.decoded = {
    	tokenSuccess: false,
      message: 'No token provided.',
      userStatus: 'guest' 
    }
    next();    
  };
};
