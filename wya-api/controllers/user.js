let Router = require('express').Router()
let {
    getAll,
    deleteAll,
    findByUsername
} = require('../handlers/user')
let isAuthenticated = require('../middlewares.js')

// For debugging
Router.route('/')
    .get(function (req, res, next) {
        getAll()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(error =>{
                next({
                    status: 400,
                    message: "Unable to retrieve all users"
                })
            })
    })

// For debugging
Router.route('/')
    .delete(function(req, res, next){
        deleteAll()
            .then(()=>{
                res.status(200).json("message: All users have been deleted")
            })
            .catch(err=>{
                next({
                    status: 400,
                    message: "Unable to delete all room"
                })
            })
    })

/*
// Expected Post Body:
// req.body.interest - ARRAY of STRINGS of interest
*/
Router.route('/interest')
    .post(function(req, res, next){
        isAuthenticated(req, res, function(user, err){
            if(user){
                console.log(req.body.interests)
                user.update({
                    interests: req.body.interests
                }).then(() => {
                    console.log(user)
                    res.status(200).json({interests: user.dataValues.interests})
                })
            }
            else res.status(401).json(err.message)
        })
    })
/*
// Expected Post Body:
// req.body.availability - JSON of availability
*/
Router.route('/availability')
    .post(function(req, res, next){
        isAuthenticated(req, res, function(user, err){
            if(user){
                console.log(req.body.availability)
                user.update({
                    availability: req.body.availability
                }).then(() => {
                    res.status(200).json(user.dataValues.availability)
                })
            }
            else res.status(401).json(err.message)
        })
    })

Router.route('/who_am_i')
    .get(function(req, res, next){
        isAuthenticated(req, res, function(user, err){
            if(user){
                res.status(200).json(user)
            }else{
                res.status(401).json({
                    message: "no one"
                })
            }
        })
    })

module.exports = Router
