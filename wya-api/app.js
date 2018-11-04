const bodyParser = require('body-parser')
const express = require('express')
const models = require('./models')
const passport = require('./config/passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const errorHandler = require('./handlers/error')
const PORT = process.env.PORT || 8000;

const app = express();

// Cors
app.use(require('cors')())

app.use(bodyParser.urlencoded({
  extended: false
}))
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

// Uncomment the following if you want to serve up static assets.
// (You must create the public folder)
/*
app.use(express.static('./public'));
*/

// Load up all of the controllers
const controllers = require('./controllers');
app.use(controllers)
app.use(errorHandler)

// First, make sure the Database tables and models are in sync
// then, start up the server and start listening.
models.sequelize.sync({
    force: false
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running on port: ${PORT}`)
    });
  });