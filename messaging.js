function onConnect(socket) {
    console.log('received socket connection')

    socket.on('register', function(data) {
        console.log('registration received: ' + data.id)
    })
}

exports.onConnect = onConnect
