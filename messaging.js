
var game = { 'white' : null, 'black' : null } 

function start(io) {
    io.sockets.on('connection', onConnect)
}

function onConnect(socket) {
    console.log('received socket connection')

    socket.on('requestJoin', function(data) {
        if(game[data.color] == null) {
            game[data.color] = data.alias
            socket.broadcast.emit('playerJoin', { 'color': data.color, 'alias': data.alias });
            socket.emit('joinAccepted', { 'color': data.color })
        }
    })
}

exports.start = start
