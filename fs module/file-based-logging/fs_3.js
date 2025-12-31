const fs = require('fs');
const path = require('path');
// const { json } = require('stream/consumers');

function logEvent(message){
    const logFilePath = path.join(__dirname, 'log.txt');
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message} \n`;

    fs.appendFile(logFilePath, logMessage, err =>{
        if(err) console.error('Error while write to log file', err.message);
    })
}
let data = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Bob Brown', age: 35 },
  ];

  

  function httpHelper(req, res) { // Note: req is first, res is second
    const { method, url } = req;
    logEvent(`Request Received: Method=${method}, URL=${url}`);

    // Set common headers
    res.setHeader('Content-Type', 'application/json');

    // Handle GET requests
    if (method === 'GET' && url === '/api') {
        res.writeHead(200);
        res.end(JSON.stringify(data));
    } 

    // Handle POST requests
    else if (method === 'POST' && url === '/api') {
        let body = '';

        // Collect the data
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // Process the data
        req.on('end', () => {
            const newData = JSON.parse(body);
            data.push(newData);
            res.writeHead(201);
            res.end(JSON.stringify({ message: 'New data added!', data }));
        });
    }

    // Handle PUT requests
    else if (method === 'PUT' && url.startsWith('/api/')) {
        const id = parseInt(url.split('/')[2]); // Extract ID from URL
        let body = '';

        // Collect the data
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // Process the data
        req.on('end', () => {
            const updatedData = JSON.parse(body);
            const index = data.findIndex(item => item.id === id);

            if (index !== -1) {
                data[index] = { ...data[index], ...updatedData }; // Update the data
                res.writeHead(200);
                res.end(
                    JSON.stringify({ message: 'PUT request successful!', data: data })
                );
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ error: 'Data not found' }));
            }
        });
    }
    else if (method === 'DELETE' && url.startsWith('/api/')) {
        const id = parseInt(url.split('/')[2]); // Extract ID from URL
        
        const index = data.findIndex(element => element.id === id);
        if (index !== -1) {
            const deletedItem = data.splice(index, 1); // Remove the data
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Data Deleted!', deletedItem }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Data not found' }));
        }
    }
    

    // Handle other routes
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
}


  module.exports  = { httpHelper };
