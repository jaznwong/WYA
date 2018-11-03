/**
 * Simple function to check weather a user is authenticated or not
 */
module.exports = function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next(req.user, null)
    }else{
        return next(null, {
            status: 401,
            message: "Please log in first"
        })
    }
}

// TODO: Create isAuthorized function to check weather a weather is authorized to do a certain task
