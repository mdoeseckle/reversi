var fs = require('fs')
var path = require('path')

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

    console.log("Request handler 'static' was called: " + pathname)
    response.writeHead(200, {"Content-Type": "text/html"})
    response.write('static')
    response.end()
}

exports.game = game
exports.static = static
