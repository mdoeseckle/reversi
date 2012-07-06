var PORT = 8888

var http = require('http')
var url = require('url')
var messaging = require('./messaging')

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname
        console.log("Request for " + pathname + " received.")

        route(handle, pathname, response)
    }

    var app = http.createServer(onRequest).listen(PORT)
    var io = require('socket.io').listen(app)

    messaging.start(io)
    
    console.log("Server has started.")
}

exports.start = start
