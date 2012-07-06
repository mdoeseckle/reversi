
var activeGame = createGame()

function start(io) {
    io.sockets.on('connection', onConnect)
}

function onConnect(socket) {
    console.log('received socket connection')

    socket.on('requestJoin', function(data) {
        if(activeGame[data.color] == null) {
            activeGame[data.color] = data.alias
            socket.broadcast.emit('playerJoin', { 'color': data.color, 'alias': data.alias });
            socket.emit('joinAccepted', { 'color': data.color })
        }
    })

    socket.emit('recap', { 'white': activeGame.white, 'black': activeGame.black, 'board' : activeGame.board })
}

function createGame() {
    var board = new Array(9);
    for (row = 0; row < board.length; ++row)
        board[row] = new Array(9);

    board[4][4] = 'white'
    board[4][5] = 'black'
    board[5][5] = 'white'
    board[5][4] = 'black'

    var game = { 'white' : null, 'black' : null, 'board' : board }
    return game 
}

exports.start = start
