function route(handles, pathname, response) {
    console.log("About to route a request for '" + pathname + "'");

    for(var index = 0; index < handles.length; index++) {
        if(handles[index].pattern.test(pathname)) {
            handles[index].handle(pathname, response)
            return
        }
    }

    console.log("No request handler found for " + pathname)
    response.writeHead(404, {"Content-Type": "text/plain"})
    response.write("404 Not found")
    response.end()
}

exports.route = route
