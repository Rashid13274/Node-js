/*
net Module
The net module provides asynchronous network API for creating servers and clients.

Use Cases:
Creating TCP or IPC servers.
Establishing socket connections.
Transmitting and receiving data over a network.

Common Methods:

Method	                Description
net.createServer()	Creates a new TCP server.
server.listen(port)	Starts the server on the specified port.
net.connect(port, host)	Creates a connection to the specified port and host.
socket.write(data)	Sends data over the socket.
socket.end()	Terminates the socket connection.
server.close()	Stops the server. 

*/

const net = require('net');

// Create a TCP server
const server = net.createServer((socket) => {
  console.log('Client connected.');

  // Handle data from the client
  socket.on('data', (data) => {
    console.log('Received from client:', data.toString());
    socket.write('Hello Client!');
  });

  // Handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected.');
  });
});

// Start the server
server.listen(8080, () => {
  console.log('Server listening on port 8080.');
});

// Create a TCP client
const client = net.connect(8080, '127.0.0.1', () => {
  console.log('Connected to server.');
  client.write('Hello Server!');
});

// Handle data from the server
client.on('data', (data) => {
  console.log('Received from server:', data.toString());
  client.end();
});
