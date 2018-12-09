let isAuthenticated = require('../middlewares.js')

module.exports = socket = function(http){
    var io = require('socket.io')(http);
    // console.log("initiated socket io")
    io.sockets.on('connection', function(socket) {
        // once a client has connected, we expect to get a ping from them saying what room they want to join
        // console.log(sessionStorage)
        socket.on('joinRoom', function(room) {
            socket.room = room
            // console.log("user joined room")
            socket.join(socket.room);
        });
        socket.on('leaveRoom', function(){
            // console.log("user left the room")
            socket.leave(socket.room)
        })
        socket.on('message', function({name, message}){
            // console.log("received message: " + message)
            io.sockets.in(socket.room).emit('message', {name, message})
        })
        socket.on('disconnect', function(){
            socket.leave(socket.room)
        })
    });
}