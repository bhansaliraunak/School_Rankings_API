var jwt = require('jwt-simple');

var auth = {
  login: (req, res)=> {
    var username = req.body.username || '';
    var password = req.body.password || '';

    if(username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid Credentials"
      });
      return;
    }

    // Fire a query to DB to check if the credentials are valid
    var dbUserObj = auth.validate(username, password);

    if(!dbUserObj) {
      // If authentication is success, we will generate a token
      // and dispatch it to the client

      res.json(genToken(dbUserObj));
    }
  },

  validate: (username, password)=> {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the db.
    name: 'arvind',
    role: 'admin',
    username: 'arvind@schoolrankings.com'
    };

  return dbUserObj;
  },

validateUser: (username)=> {
  // spoofing the DB response for simplicity
  var dbUserObj = { // spoofing a userobject from the DB
    name: 'arvind',
    role: 'admin',
    username: 'arvind@schoolrankings.com'
    };

  return dbUserObj;
},
}

// private method
function genToken(user) {
  var expires = expiresIn(7); //7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());

  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
