const bodyParser = require('body-parser')
const express = require('express')
const models = require('./models')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

// Setting up passport
app.use(session({
  secret: "super-secret-keyword-that-should-be-in-env-file",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Run local strategy passport configs
require('./config/passport')(passport)

// Uncomment the following if you want to serve up static assets.
// (You must create the public folder)
/*
app.use(express.static('./public'));
*/

// Uncomment the following if you want to use handlebars
// on the backend. (You must create the views folder)
/*
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);
*/



// Load up all of the controllers
const controllers = require('./controllers');
app.use(controllers)


// First, make sure the Database tables and models are in sync
// then, start up the server and start listening.
models.sequelize.sync({force: false})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running on port: ${PORT}`)
    });
  });
