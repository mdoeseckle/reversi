var PORT = 8888

var http = require('http')
var url = require('url')

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname
        pathname = pathname.substring(1)                        //remove leading forward slash
        console.log("Request for " + pathname + " received.")

        route(handle, pathname, response)
    }

    http.createServer(onRequest).listen(PORT)
    console.log("Server has started.")
}

exports.start = start
