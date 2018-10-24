let Router = require('express').Router()
let {searchRooms, getAllRooms} = require('./handlers/room.js')

Router.route('/rooms/search/:query').get(searchRooms)

Router.route('/rooms').get(getAllRooms)

module.exports = Router