let {Users} = require('../models')

let getUserById = async function(id){
    try{
        return await Users.findById(id)
    }catch(err){
        throw `Could not find userID ${id}`
    }
}

let findOneByUsername = async function(username){
    return Users.findOne({where:{username}})
}

let register = async function (req, res, next) {
    try {
        let user = await Users.create(req.body);
        return res.status(200).json(user);
    }
    catch (err) {
        // TODO: Handle error code duplicate User and send back message duplicate user
        next({
            status: 400,
            message: `Unable to register user`
        });
    }
}

let getAll = async function(req, res, next){
    try{
        let allUsers =  await Users.findAll()
        return res.status(200).json(allUsers)
    }catch(err){
        next({
            status: 400,
            message: "Unable to get all users"
        })
    }
}

let login = async function (req, res, next){
    try{
        // Assume User has already logged in
        res.status(200).json({message: "Welcome"})
    }catch(err){
        console.log(err)
        next({
            status: 400,
            message: "Invalid username/password"
        })
    }
}

let isAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        next()
    }else{
        return next({
            status: 401,
            message: "Please log in first"
        })
    }
}

module.exports = {
    register,
    login,
    isAuthenticated,
    getUserById,
    findOneByUsername,
    getAll
}