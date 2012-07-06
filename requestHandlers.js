function game(response) {
  console.log("Request handler 'game' was called.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('game');
    response.end();
}

function static(response) {
  console.log("Request handler 'static' was called.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('static');
    response.end();
}

exports.game = game;
exports.static = static;
