let Router = require('express').Router()
let {
    findById,
    getAll,
    create,
    deleteAll,
    findByRoomname,
    addUser,
    getUsers,
    isUserInRoom,
    deleteById
} = require('../handlers/room')
let isAuthenticated = require('../middlewares.js')

// For debugging
Router.route('/')
    .get(function (req, res, next) {
        getAll()
            .then(rooms => {
                res.status(200).json(rooms)
            })
            .catch(error =>{
                next({
                    status: 400,
                    message: "Unable to retrieve all rooms"
                })
            })
    })

// For debugging
Router.route('/')
    .delete(function(req, res, next){
        deleteAll()
            .then(()=>{
                res.status(200).json("message: All rooms have been deleted")
            })
            .catch(err=>{
                next({
                    status: 400,
                    message: "Unable to delete all rooms"
                })
            })
    })

/*
// Expected Post Body:
// req.body.roomname - STRING of roomname *REQUIRED*
// req.body.description - STRING of room description
*/
Router.route('/')
    .post(function(req, res, next){
        isAuthenticated(req, res, function(user, err){
            if(user){
                let createParams = {
                    roomname: req.body.roomname,
                    description: req.body.description,
                    creatorID: user.id,
                    roomstatus: 'OPEN'
                }
                create(createParams).then((room) => {
                    addUser(room, user).then((data) => {
                        res.json(data)
                    })
                })
                .catch((err) => {res.status(401).json(err.message)})
            }
            else res.status(401).json(err.message)
        })
    })

Router.route('/:roomID')
    .get(function(req, res, next){
        isAuthenticated(req, res, function(user, err){
            if(user){
                findById(req.params.roomID)
                .then((room) => {
                    isUserInRoom(room, user.id)
                    .then((isInRoom) => {
                        if (isInRoom) res.json(room)
                        else res.status(403).json("Not Part of Room")
                    })
                    .catch((err) => {res.status(401).json(err.message)})
                })
                .catch((err) => {res.status(401).json(err.message)})
            }
            else res.status(401).json(err.message)
        })
    })

  Router.route('/:roomID/users')
      .get(function(req, res, next){
          isAuthenticated(req, res, function(user, err){
              if(user){
                  findById(req.params.roomID)
                  .then((room) => {
                      isUserInRoom(room, user.id)
                      .then((isInRoom) => {
                          if (isInRoom){
                            getUsers(room)
                            .then((users) => {
                                res.json(users)
                            })
                            .catch((err) => {res.status(401).json(err.message)})
                          }
                          else res.status(403).json("Not Part of Room")
                      })
                      .catch((err) => {res.status(401).json(err.message)})
                  })
                  .catch((err) => {res.status(401).json(err.message)})
              }
              else res.status(401).json(err.message)
          })
      })

/*
// Expected Post Body:
// req.body.roomname - STRING of roomname *REQUIRED*
// req.body.description - STRING of room description
*/
Router.route('/:roomId')
    .patch(function(req, res, next){
        isAuthenticated(req, res, function(user, err){
            if(user){
                findById(req.params.roomId)
                .then((room) => {
                    if (room.creatorID == user.id){
                        let updatedRoomname = room.roomname
                        if (req.body.roomname) updatedRoomname = req.body.roomname
                        let updatedDescription = room.description
                        if (req.body.description) updatedDescription = req.body.description
                        room.update({
                            roomname: updatedRoomname,
                            description: updatedDescription
                        })
                        .then((room) => {res.json(room)})
                        .catch((err) => {res.status(401).json(err.message)})
                    }
                })
                .catch((err) => {res.status(401).json(err.message)})
            }
            else res.status(401).json(err.message)
        })
    })

    /*
    // Expected Post Body:
    // req.body.roomname - STRING of roomname *REQUIRED*
    // req.body.description - STRING of room description
    */
    Router.route('/:roomId')
        .patch(function(req, res, next){
            isAuthenticated(req, res, function(user, err){
                if(user){
                    findById(req.params.roomId)
                    .then((room) => {
                        if (room.creatorID == user.id){
                            let updatedRoomname = room.roomname
                            if (req.body.roomname) updatedRoomname = req.body.roomname
                            let updatedDescription = room.description
                            if (req.body.description) updatedDescription = req.body.description
                            room.update({
                                roomname: updatedRoomname,
                                description: updatedDescription
                            })
                            .then((room) => {res.json(room)})
                            .catch((err) => {res.status(401).json(err.message)})
                        }
                        else res.status(403).json("Not Creator of Room")
                    })
                    .catch((err) => {res.status(401).json(err.message)})
                }
                else res.status(401).json(err.message)
            })
        })

Router.route('/:roomId')
    .delete(function(req, res, next){
        isAuthenticated(req, res, function(user, err){
            if(user){
                findById(req.params.roomId)
                .then((room) => {
                    if (room.creatorID == user.id){
                        deleteById(room.id)
                        .then(() => {res.json("Room deleted")})
                        .catch(() => {res.json("Room unable to be deleted")})
                    }
                    else res.status(403).json("Not Creator of Room")
                })
                .catch((err) => {res.status(401).json(err.message)})
            }
            else res.status(401).json(err.message)
        })
    })

Router.route('/join/:roomId')
    .get(function(req, res, next){
        isAuthenticated(req, res, function(user, err){
            if(user){
                findById(req.params.roomId)
                .then((room) => {
                    addUser(room, user)
                    .then((data) => {res.json(data)})
                    .catch((err) => {res.status(401).json(err.message)})
                })
                .catch((err) => {res.status(401).json(err.message)})
            }
            else res.status(401).json(err.message)
        })
    })

module.exports = Router
