var fs = require('fs')
var path = require('path')

var GAMEID_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
var GAMEID_LENGTH = 6 

function createGameId()
{
    var id = ''
    for(var i = 0; i < GAMEID_LENGTH; i++)
        id += GAMEID_CHARSET.charAt(Math.floor(Math.random() * GAMEID_CHARSET.length))

    return id
}

function newGame(pathname, response) {
    var gameId = createGameId()
    console.log('creating new game: ' + gameId)

    response.writeHead(302, { 'Location': '/' + gameId });
    response.end()
}

function game(pathname, response) {
    console.log('loading game page')
    var fileContents = fs.readFileSync('./views/game.html', 'utf8')
    response.writeHead(200, {"Content-Type": "text/html"})
    response.write(fileContents)
    response.end()
}

function static(pathname, response) {
    var contentType = 'text/html'

    switch(path.extname(pathname)) {
        case '.js':
            contentType = 'text/javascript'
            break
        case '.css':
            contentType = 'text/css'
            break
    }

    var filePath = '.' + pathname
    if(fs.existsSync(filePath)) {
        var fileContents = fs.readFileSync(filePath, 'utf8');

        response.writeHead(200, {"Content-Type": contentType })
        response.write(fileContents)
        response.end()
    } else {
        console.log('ERROR: file not found: ' + pathname)
        response.writeHead(404, {"Content-Type": "text/plain"})
        response.write("404 Not found")
        response.end()
    } 
}

exports.newGame = newGame
exports.game = game
exports.static = static
