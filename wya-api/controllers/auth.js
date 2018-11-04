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

Router.route('/logout')
    .post((req, res, next)=>{
        req.logout()
        res.status(200).json({
            message: "You have been successfully logged out"
        })
    })

module.exports = Router