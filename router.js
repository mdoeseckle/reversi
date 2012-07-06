function route(handle, pathname, response) {
    console.log("About to route a request for " + pathname);

    

//    url(r'^$', 'reversi.views.home', name='home'),
//    url(r'^(?P<game_id>[\w|\d]+)$', 'reversi.views.game', name='game'),

    if (typeof handle[pathname] === 'function') {
        handle[pathname](pathname, response);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;
