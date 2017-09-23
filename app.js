//dependencies
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let exphbs = require('express-handlebars')
var expressValidator = require('express-validator');
let path = require('path');
let app = express();

//db
mongoose.connect('mongodb://localhost/mango');
let db = mongoose.connection;

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

//view 
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}))
app.set('view engine', 'handlebars')

//static 
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static('public/img')); 

//routes
app.use('/', routes);
app.use('/users', form);

//port
app.listen(3000);
console.log('listening on port 3000');