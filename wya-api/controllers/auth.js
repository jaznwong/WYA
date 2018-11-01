let Router = require('express').Router()
let passport = require('passport')
let {
    login,
    signup
} = require('../handlers/auth')

Router.route('/login')
    .post(passport.authenticate('local'), login)

Router.route('/signup')
    .post(signup)


module.exports = Router