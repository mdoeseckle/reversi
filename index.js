var server = require("./server")
var router = require("./router")
var requestHandlers = require("./requestHandlers")

var pair = function(pattern, handle) {
    return { 'pattern':pattern, 'handle':handle }
}

var handle = []
handle.push(pair(/^$/, requestHandlers.newGame))
handle.push(pair(/^static\/\w+/, requestHandlers.static))

    //url(r'^(?P<game_id>[\w|\d]+)$', 'reversi.views.game', name='game'),

server.start(router.route, handle)
