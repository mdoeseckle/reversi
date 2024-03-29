var server = require("./server")
var router = require("./router")
var requestHandlers = require("./requestHandlers")

var pair = function(pattern, handle) {
    return { 'pattern':pattern, 'handle':handle }
}

var handle = []
handle.push(pair(/^$/, requestHandlers.game))
handle.push(pair(/^static\/\w+/, requestHandlers.static))

// when supporting multiple simultaneous games, use these and remove the root handler above:
//handle.push(pair(/^$/, requestHandlers.newGame))
//handle.push(pair(/^[\w|\d]+$/, requestHandlers.game))

server.start(router.route, handle)
