let Router = require('express').Router()
let passport = require('passport')
let {login, register, getAll} = require('../handlers/user')

Router.route('/login')
    .post(passport.authenticate('local'), login)

Router.route('/register')
    .post(register)

// for debugging
// Router.route('/')
//     .get(getAll)


module.exports = Router