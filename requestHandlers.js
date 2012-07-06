var fs = require('fs')
var path = require('path')

function newGame(pathname, response) {
    console.log('new game')
}

function game(pathname, response) {
  console.log("Request handler 'game' was called.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('game');
    response.end();
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
