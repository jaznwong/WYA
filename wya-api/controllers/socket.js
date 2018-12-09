let isAuthenticated = require('../middlewares.js')

module.exports = socket = function(http){
    var io = require('socket.io')(http);
    // console.log("initiated socket io")
    io.sockets.on('connection', function(socket) {
        socket.on('joinRoom', function(room) {
            socket.room = room
            // console.log("user joined room")
            socket.join(socket.room);
            socket.broadcast.to(socket.room).emit("userJoined")
        });
        socket.on('leaveRoom', function(){
            // console.log("user left the room")
            socket.leave(socket.room)
        })
        socket.on('message', function({name, message}){
            // console.log("received message: " + message)
            io.sockets.in(socket.room).emit('message', {name, message})
        })
        socket.on('startVoting', function(){
            socket.broadcast.to(socket.room).emit("startVoting")
        })

        socket.on('disconnect', function(){
            socket.leave(socket.room)
        })
    });
}