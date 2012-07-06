
var games = {}

function start(io) {
    io.sockets.on('connection', onConnect)
}

function onConnect(socket) {
    console.log('received socket connection')

    socket.on('register', function(data) {
        console.log('registration received: ' + data.id)

        if(games[data.id] == null) {
            console.log('creating new game: ' + data.id)
            games[data.id] = createGame(data.id)
        }

        games[data.id].observers.push(socket)
        console.log(games[data.id])
    })
    
    socket.on('requestJoin', onRequestJoin)
}

function onRequestJoin(data) {
    console.log('received join request: ' + data.id + ', ' + data.color + ', ' + data.alias)
}

function createGame(id) {
    return { 'id': id, 'white': null, 'black': null, 'turn': null, 'observers':[] }
}

exports.start = start
