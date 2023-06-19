var net = require('net');

var server = net.createServer(function (socket: any) {
    //socket.write('Echo server\r\n');
    socket.pipe(socket);
    socket.on('data', function (data: any) {
        console.log('Received: ' + data);
        socket.write('got: ' + data); // kill client after server's response
    });
    socket.on("close", function (socket: any) {
        console.log("" + new Date() + "con closed")
    })
    socket.on("drop", function (socket: any) {
        console.log("" + new Date() + "con dropped")
    })
    socket.on("error", function (error: any) {
        console.log("con error ocurred" + error)
    })
});

server.listen(1337, '127.0.0.1');

server.on("close", function (socket: any) {
    console.log("con closed")
})