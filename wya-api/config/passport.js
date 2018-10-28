let localStrategy = require('passport-local').Strategy
let {getUserById, findOneByUsername} = require('../handlers/user')

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        // passing only userID
        done(null, user.id)
    })

    passport.deserializeUser(function(userID, done){
        getUserById(userID)
        .then(user=>{
            done(null, user)
        })
        .catch(err=>{
            done(err, null)
            throw `error deserealizing user`
        })
    })

    // signup strategy
    passport.use(new localStrategy(function(username, password, done){
        findOneByUsername(username)
            .then(user=>{
                if(user == null) return done(null, false)
                return user.validPassword(password)
            })
            .then(user=>{
                return done(null, user)
            })
            .catch(err => done(err))
    }))
}