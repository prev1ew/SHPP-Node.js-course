/*
In the node.js intro tutorial (http://nodejs.org/), they show a basic tcp 
server, but for some reason omit a client connecting to it.  I added an 
example at the bottom.
Save the following server in example.js:
*/

const net = require('net');
const port = 7070;
const host = '127.0.0.1';

const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
});

let sockets: any[] = [];
server.on('connection', function (sock: any) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);
    sock.on('data', function (data: any) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to all the connected, the client will receive it as data from the server
        sockets.forEach(function (sock, index, array) {
            sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
        });
    });
});