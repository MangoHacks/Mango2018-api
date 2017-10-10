//dependencies
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let exphbs = require('express-handlebars')
var expressValidator = require('express-validator');
let path = require('path');
let app = express();
var cors = require('cors')
app.use(cors())

//db
let db = mongoose.connection;
var promise = mongoose.connect('mongodb://localhost/mango', {
  useMongoClient: true,
  /* other options */
});

//routes
let routes = require('./routes/index');
let form = require('./routes/form');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

  // Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});





//view 
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}))
app.set('view engine', 'handlebars')

//static 
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static('public/img')); 

//routes
app.use('/', routes);
app.use('/', form);
//port
var port = process.env.port || 8050;

app.listen(port );
console.log('Listening on port '+ port);