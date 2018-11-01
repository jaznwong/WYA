let {
    create,
    findByUsername
} = require('./user')

/**
 * Register a user, following Router.route() params
 */
let signup = async function (req, res, next) {
    try {
        await create(req.body);
        console.log('created')
        return res.redirect(307, '/auth/login')
    } catch (err) {
        console.log(err)
        next({
            status: 400,
            message: err.message || `Unable to signup username`
        });
    }
}

/**
 * Handles what an user does after they are logged in
 * Follows Router.route() params
 */
let login = async function (req, res, next) {
    try {
        // Assume User has already logged in
        // TODO: Redirect to user/profile route
        res.status(200).json({
            user: await findByUsername(req.body.username)
        })
    } catch (err) {
        console.log(err)
        next({
            status: 400,
            message: "Invalid username/password"
        })
    }
}

module.exports = {
    signup,
    login,
}