let Router = require('express').Router()
let {
    getAll,
    deleteAll
} = require('../handlers/user')

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

module.exports = Router