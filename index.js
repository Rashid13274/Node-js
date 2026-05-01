// const http = require('http');
// const { httpHelper }= require('./file-module/file-based-logging/fs_3');

// // create a server
// const server = http.createServer((req, res) =>{
//     httpHelper(req, res);
// })

// server.listen(3001, () => console.log(`server is listening on port 3001`));

// =========================== test =============================================//
const  http = require('http');

const arr = [
    {id: 1, name: 'jon doe', age: 23 },
    {id: 2, name: 'jac doe', age: 24 },
    {id: 3, name: 'sam doe', age: 25 },
]
const server = http.createServer((req, res) =>{
    res.setHeader('Content-Type', 'application/json');

    if(req.method === 'GET' && req.url === '/'){
        res.writeHead(200);
        res.end(JSON.stringify(arr));
    }

    else if(req.method === 'POST' && req.url === '/api' ){
        let body = '';
        // collect the data 
        req.on('data', chunk =>{
            body += chunk.toString();
        })

        // process the data
        req.on('end', () =>{
            let newData = JSON.parse(body);
            arr.push(newData)
            res.writeHead(201);
            res.end(JSON.stringify(arr));
        } )
    }

    // Handle PUT requests
    else if (req.method === 'PUT' && req.url.startsWith('/api/')) {
        const id = parseInt(req.url.split('/')[2]); // Extract ID from URL
        let body = '';

        // Collect the data
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // Process the data
        req.on('end', () => {
            const updatedData = JSON.parse(body);
            const index = arr.findIndex(item => item.id === id);

            if (index !== -1) {
                arr[index] = { ...arr[index], ...updatedData }; // Update the data
                res.writeHead(200);
                res.end(
                    JSON.stringify({ message: 'PUT request successful!', data: arr })
                );
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ error: 'Data not found' }));
            }
        });
    }
    
    else if(req.method === 'DELETE' && req.url.startsWith('/api/')){
        const id = parseInt(req.url.split('/')[2]);
        const index = arr.findIndex(item => item.id == id);
        if(index !== -1){
            const result = arr.splice(index, 1);
            res.writeHead(200);
            res.end(JSON.stringify({success: true, data: result}));
        }
        else{
            res.writeHead(404);
            res.end(JSON.stringify({success: false, message: 'no  data with that id'}));
        }
    }
})



server.listen(3000, ()=> console.log(`node server is running on port 3000`));

