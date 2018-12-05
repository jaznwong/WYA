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
    deleteById,
    canBeAccepted
} = require('../handlers/room')
let {
    findVote,
    findVotes,
    createVote,
    deleteAllVotes,
    deleteVoteById
} = require('../handlers/vote')
let isAuthenticated = require('../middlewares.js')
let yelp = require('../services/yelp')

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

Router.route('/:roomID/suggestion')
    .get(function(req, res, next){
        isAuthenticated(req, res, function(user, err){
            if(user){
                findById(req.params.roomID)
                .then((room) => {
                    isUserInRoom(room, user.id)
                    .then((isInRoom) => {
                        if (isInRoom){
                          res.json(room.location)
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

Router.route('/:roomID/status')
    .get(function(req, res, next){
        isAuthenticated(req, res, function(user, err){
            if(user){
                findById(req.params.roomID)
                .then((room) => {
                    isUserInRoom(room, user.id)
                    .then((isInRoom) => {
                        if (isInRoom){
                          res.json(room.roomstatus)
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
                  if (room.roomstatus == 'OPEN'){
                    addUser(room, user)
                    .then((data) => {res.json(data)})
                    .catch((err) => {res.status(401).json(err.message)})
                  }
                  else res.status(401).json("Room is not Open")
                })
                .catch((err) => {res.status(401).json(err.message)})
            }
            else res.status(401).json(err.message)
        })
    })

Router.route('/:roomId/initiate_vote')
    .post(function(req, res, next){
        isAuthenticated(req, res, function(user, err){
            if(user){
                findById(req.params.roomId)
                .then((room) => {
                  if (room.creatorID == user.id && room.roomstatus == 'OPEN'){
                    /*
                    should get a single event from the yelp api based on common interests.
                    * save the suggested event in the database
                    * should set room status to voting
                    */
                    //For now, interest of event will be based on creators first interest
                    let interest = 'Bars';
                    if(user.interests != null && user.interests.length >=1 ) interest = user.interest[0];
                    console.log(yelp.yelp.search)
                    yelp.yelp.search('New York City', interest, 4)
                    .then((event) => {
                      let suggestionIndex = Math.floor(Math.random() * event.length);
                      room.update({
                        location: event[suggestionIndex],
                        roomstatus: 'VOTING'
                      })
                      .then((room) => {res.status(200).json(room)})
                      .catch((err) => {res.status(401).json(err)})
                    })
                    .catch((err) => {res.status(401).json("Room is cannot be set to voting")})
                  }
                  else res.status(401).json("Room is cannot be set to voting")
                })
                .catch((err) => {res.status(401).json(err)})
            }
            else res.status(401).json(err.message)
        })
    })

Router.route('/:roomId/vote')
    .post(function(req, res, next){
        isAuthenticated(req, res, function(user, err){
            if(user){
                findById(req.params.roomId)
                .then((room) => {
                  if (room.roomstatus == 'VOTING'){
                    let votedFor = true;
                    if (req.body.votedFor == 'false') votedFor = false;
                    createVote({
                      votedFor: votedFor,
                      userId: user.id,
                      roomId: room.id
                    })
                    .then((data) => {res.json(data)})
                    .catch((err) => {res.status(401).json(err)})
                  }
                  else res.status(401).json("Room is not Voting")
                })
                .catch((err) => {res.status(401).json(err)})
            }
            else res.status(401).json(err.message)
        })
    })

Router.route('/:roomId/votes')
    .get(function(req, res, next){
        isAuthenticated(req, res, function(user, err){
            if(user){
                findById(req.params.roomId)
                .then((room) => {
                    findVotes(room.id)
                    .then((data) => {res.json(data)})
                    .catch((err) => {res.status(401).json(err)})
                })
                .catch((err) => {res.status(401).json(err)})
            }
            else res.status(401).json(err)
        })
    })

  Router.route('/:roomId/end_vote')
      .post(function(req, res, next){
          isAuthenticated(req, res, function(user, err){
              if(user){
                  findById(req.params.roomId)
                  .then((room) => {
                    if (room.creatorID == user.id && room.roomstatus == 'VOTING'){
                      /*
                      ..* post request
                      ..* param is "accepted", which will be a type boolean
                      ..* should check if everyone has voted or not or if the accepted percentage should reach 60%.
                      ..* upon complete, room status should be changed to either vote or locked. The event should also be recorded in the database
                      */
                      let accepted = true;
                      if (req.body.accepted == 'false') votedFor = false;
                      if (accepted){
                          room.getUsers();
                          .then((users) => {
                              canBeAccepted(room.id, users.length)
                              .then((accepted) => {
                                  if (accepted){
                                      room.update({
                                        roomstatus: 'FINALIZED'
                                      })
                                  }
                                  else res.json('Cannot Be Accepted')
                              })
                              .catch((err) => {res.status(401).json(err)})
                          })
                          .catch((err) => {res.status(401).json(err)})
                      }
                      else {
                          let interest = 'Bars';
                          if(user.interests != null && user.interests.length >=1 ) interest = user.interest[0];
                          console.log(yelp.yelp.search)
                          yelp.yelp.search('New York City', interest, 4)
                          .then((event) => {
                            let suggestionIndex = Math.floor(Math.random() * event.length);
                            room.update({
                              location: event[suggestionIndex],
                              roomstatus: 'VOTING'
                            })
                            .then((room) => {res.status(200).json(room)})
                            .catch((err) => {res.status(401).json(err)})
                          })
                          .catch((err) => {res.status(401).json("Room is cannot be set to voting")})
                      }
                    }
                    else res.status(401).json("Room is cannot be set to voting")
                  })
                  .catch((err) => {res.status(401).json(err)})
              }
              else res.status(401).json(err.message)
          })
      })
module.exports = Router
