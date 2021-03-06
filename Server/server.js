var express = require('express'); //Create our app with express
var http = require('http');
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var logger = require('morgan'); //Logs requests to the console
var cors = require('cors');
var SuperLogin = require('superlogin');
 
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

var config = {
  dbServer: {
    protocol: 'http://',
    host: 'localhost:5984',
    user: '',
    password: '',
    userDB: 'sl-users',
    couchAuthDB: '_users'
  },
  mailer: {
    fromEmail: 'gmail.user@gmail.com',
    options: {
      service: 'Gmail',
        auth: {
          user: 'gmail.user@gmail.com',
          pass: 'userpass'
        }
    }
  },
  security: {
    maxFailedLogins: 3,
    lockoutTime: 600,
    tokenLife: 86400,
    loginOnRegistration: true,
  },
  userDBs: {
    defaultDBs: {
      private: ['supertest']
    }
  },
  providers: { 
    local: true 
  }
}
 
// Initialize SuperLogin 
var superlogin = new SuperLogin(config);
 
// Mount SuperLogin's routes to our app 
app.use('/auth', superlogin.router);
 
app.listen(app.get('port')); //Gets the port that has been set up above
console.log("App listening on " + app.get('port'));