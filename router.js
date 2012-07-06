function route(handles, pathname, response) {
    var pname = pathname.substring(1)                 //remove leading forward slash

    for(var index = 0; index < handles.length; index++) {
        if(handles[index].pattern.test(pname)) {
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
