const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {
    findById,
    findByUsername
} = require('../handlers/user')

passport.use(new LocalStrategy({
        usernameField: 'username',
    },
    (username, password, done) => {
        findByUsername(username).then((user) => {
            user.validPassword(password)
                .then(match=>{
                    if(!match){
                        return done(null, false, {
                            message: 'Incorrect password.'
                        })
                    }else{
                        return done(null, user, {
                            message: 'Successfully Logged In!'
                        })
                    }
                })
        })
        .catch(err=>{
            return done(null, false, {
                message: 'Incorrect username.'
            });
        });
    }));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    findById(id).then((user) => {
        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    });
});

passport.redirectIfLoggedIn = (route) =>
    (req, res, next) => (req.user ? res.redirect(route) : next());

passport.redirectIfNotLoggedIn = (route) =>
    (req, res, next) => (req.user ? next() : res.redirect(route));


module.exports = passport;